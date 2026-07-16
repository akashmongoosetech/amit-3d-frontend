import { createFileRoute } from "@tanstack/react-router";
import { Save, Upload, Eye, EyeOff, Check, X } from "lucide-react";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/admin/PageHeader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAdminAuth } from "@/context/AdminAuthContext";
import {
  getAdminProfile,
  updateAdminProfile,
  changeAdminPassword,
} from "@/hooks/useAdminData";
import type { AdminProfile } from "@/hooks/useAdminData";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({
    meta: [{ title: "Settings — Verto3D Admin" }],
  }),
  component: SettingsPage,
});

const inputClass =
  "w-full rounded-xl border border-input bg-black/40 px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring";

function SettingCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function SaveButton({ onClick, loading, disabled }: { onClick: () => void; loading?: boolean; disabled?: boolean }) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || loading}
      className="btn-pill mt-4 bg-primary px-5 py-2 text-sm text-primary-foreground hover:bg-accent hover:text-accent-foreground disabled:opacity-60"
    >
      <Save className="size-4" />
      {loading ? "Saving…" : "Save Changes"}
    </Button>
  );
}

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const UPLOADS_BASE = API_BASE.replace(/\/api\/?$/, "");

function SettingsPage() {
  const { user, updateProfileImage } = useAdminAuth();
  const [twoFactor, setTwoFactor] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [username, setUsername] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const initialRef = useRef<AdminProfile | null>(null);

  useEffect(() => {
    getAdminProfile()
      .then((profile) => {
        initialRef.current = profile;
        setFirstName(profile.firstName);
        setLastName(profile.lastName);
        setEmail(profile.email);
        setMobile(profile.mobile);
        setUsername(profile.username);
        if (profile.profileImage) {
          if (profile.profileImage.startsWith("data:")) {
            setProfileImageUrl(profile.profileImage);
          } else {
            setProfileImageUrl(`${UPLOADS_BASE}${profile.profileImage}`);
          }
        }
      })
      .catch(() => {
        toast.error("Failed to load profile");
      })
      .finally(() => setLoading(false));
  }, []);

  const hasProfileChanges = (() => {
    const init = initialRef.current;
    if (!init) return false;
    return (
      firstName !== init.firstName ||
      lastName !== init.lastName ||
      email !== init.email ||
      mobile !== init.mobile ||
      username !== init.username ||
      profileFile !== null
    );
  })();

  const passwordRules = [
    { label: "At least 8 characters", check: newPassword.length >= 8 },
    { label: "One uppercase letter", check: /[A-Z]/.test(newPassword) },
    { label: "One lowercase letter", check: /[a-z]/.test(newPassword) },
    { label: "One number", check: /[0-9]/.test(newPassword) },
    { label: "One special character", check: /[^A-Za-z0-9]/.test(newPassword) },
    { label: "Passwords match", check: confirmPassword !== "" && newPassword === confirmPassword },
  ];

  const passwordsFilled = currentPassword && newPassword && confirmPassword;
  const allRulesPass = passwordRules.every((r) => r.check);

  const handleProfilePic = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProfileFile(file);
    setProfilePreview(URL.createObjectURL(file));
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const formData = new FormData();
      if (profileFile) formData.append("profileImage", profileFile);
      if (firstName !== initialRef.current?.firstName) formData.append("firstName", firstName);
      if (lastName !== initialRef.current?.lastName) formData.append("lastName", lastName);
      if (email !== initialRef.current?.email) formData.append("email", email);
      if (mobile !== initialRef.current?.mobile) formData.append("mobile", mobile);
      if (username !== initialRef.current?.username) formData.append("username", username);

      const updated = await updateAdminProfile(formData);
      initialRef.current = updated;

      if (updated.profileImage) {
        const url = updated.profileImage.startsWith("data:")
          ? updated.profileImage
          : `${UPLOADS_BASE}${updated.profileImage}`;
        setProfileImageUrl(url);
        setProfileFile(null);
        setProfilePreview(null);
        updateProfileImage(url);
      }

      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    setSavingPassword(true);
    try {
      await changeAdminPassword({ currentPassword, newPassword, confirmPassword });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success("Password changed successfully");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to change password");
    } finally {
      setSavingPassword(false);
    }
  };

  const currentImage = profilePreview || profileImageUrl;

  if (loading) {
    return (
      <div>
        <PageHeader title="Settings" description="Manage your admin preferences" />
        <div className="flex items-center justify-center py-16 text-sm text-muted-foreground">
          Loading settings…
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Settings" description="Manage your admin preferences" />

      <div className="space-y-6 max-w-2xl">
        <SettingCard title="Profile Settings">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div
                className="relative flex size-16 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-border bg-card transition-colors hover:bg-card/50"
                onClick={() => fileInputRef.current?.click()}
              >
                {currentImage ? (
                  <img src={currentImage} alt="Profile" className="size-full object-cover" />
                ) : (
                  <Upload className="size-5 text-muted-foreground" />
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfilePic}
                />
              </div>
              <div className="text-sm">
                <p className="font-medium text-foreground">Profile Picture</p>
                <p className="text-xs text-muted-foreground">JPG, PNG or WEBP. Max 10MB.</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label className="mb-1.5 block text-sm text-muted-foreground">First Name</Label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your first name"
                  className={inputClass}
                />
              </div>
              <div>
                <Label className="mb-1.5 block text-sm text-muted-foreground">Last Name</Label>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter your last name"
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <Label className="mb-1.5 block text-sm text-muted-foreground">Email</Label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                className={inputClass}
              />
            </div>
            <div>
              <Label className="mb-1.5 block text-sm text-muted-foreground">Mobile</Label>
              <input
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                type="tel"
                placeholder="Enter your mobile number"
                className={inputClass}
              />
            </div>
            <div>
              <Label className="mb-1.5 block text-sm text-muted-foreground">Username</Label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className={inputClass}
              />
            </div>
          </div>
          <SaveButton onClick={handleSaveProfile} loading={saving} disabled={!hasProfileChanges} />
        </SettingCard>

        <SettingCard title="Security Settings">
          <div className="space-y-4">
            <div>
              <Label className="mb-1.5 block text-sm text-muted-foreground">Current Password</Label>
              <div className="relative">
                <input
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  type={showCurrent ? "text" : "password"}
                  placeholder="Enter current password"
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  tabIndex={-1}
                >
                  {showCurrent ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>
            <div>
              <Label className="mb-1.5 block text-sm text-muted-foreground">New Password</Label>
              <div className="relative">
                <input
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  type={showNew ? "text" : "password"}
                  placeholder="Enter new password"
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => setShowNew((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  tabIndex={-1}
                >
                  {showNew ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              {newPassword && (
                <div className="mt-2 space-y-1">
                  {passwordRules.map((rule) => (
                    <div key={rule.label} className="flex items-center gap-2 text-xs">
                      {rule.check ? (
                        <Check className="size-3 text-emerald-400" />
                      ) : (
                        <X className="size-3 text-muted-foreground" />
                      )}
                      <span className={rule.check ? "text-emerald-400" : "text-muted-foreground"}>
                        {rule.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div>
              <Label className="mb-1.5 block text-sm text-muted-foreground">Confirm Password</Label>
              <div className="relative">
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type={showConfirm ? "text" : "password"}
                  placeholder="Re-enter new password"
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  tabIndex={-1}
                >
                  {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Switch id="2fa" checked={twoFactor} onCheckedChange={setTwoFactor} />
              <Label htmlFor="2fa" className="text-sm text-muted-foreground">
                Two-factor authentication
              </Label>
            </div>
          </div>
          <SaveButton
            onClick={handleChangePassword}
            loading={savingPassword}
            disabled={!passwordsFilled || !allRulesPass}
          />
        </SettingCard>
      </div>
    </div>
  );
}
