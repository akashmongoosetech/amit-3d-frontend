import { createFileRoute } from "@tanstack/react-router";
import { Settings, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/admin/PageHeader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({
    meta: [{ title: "Settings — Verto3D Admin" }],
  }),
  component: SettingsPage,
});

const inputClass =
  "w-full rounded-xl border border-input bg-black/40 px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring";

const selectClass =
  "w-full rounded-xl border border-input bg-black/40 px-4 py-2.5 text-sm outline-none transition-colors focus:border-ring [&>option]:bg-card";

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

function SaveButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      onClick={onClick}
      className="btn-pill mt-4 bg-primary px-5 py-2 text-sm text-primary-foreground hover:bg-accent hover:text-accent-foreground"
    >
      <Save className="size-4" />
      Save Changes
    </Button>
  );
}

function SettingsPage() {
  const [twoFactor, setTwoFactor] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);

  const handleSave = () => {
    toast.success("Settings saved successfully.");
  };

  return (
    <div>
      <PageHeader title="Settings" description="Manage your admin preferences" />

      <div className="space-y-6 max-w-2xl">
        <SettingCard title="Profile Settings">
          <div className="space-y-4">
            <div>
              <Label className="mb-1.5 block text-sm text-muted-foreground">Full Name</Label>
              <input placeholder="Enter your full name" className={inputClass} />
            </div>
            <div>
              <Label className="mb-1.5 block text-sm text-muted-foreground">Email</Label>
              <input type="email" placeholder="Enter your email" className={inputClass} />
            </div>
          </div>
          <SaveButton onClick={handleSave} />
        </SettingCard>

        <SettingCard title="Security Settings">
          <div className="space-y-4">
            <div>
              <Label className="mb-1.5 block text-sm text-muted-foreground">Current Password</Label>
              <input type="password" placeholder="Enter current password" className={inputClass} />
            </div>
            <div>
              <Label className="mb-1.5 block text-sm text-muted-foreground">New Password</Label>
              <input type="password" placeholder="Enter new password" className={inputClass} />
            </div>
            <div className="flex items-center gap-3">
              <Switch id="2fa" checked={twoFactor} onCheckedChange={setTwoFactor} />
              <Label htmlFor="2fa" className="text-sm text-muted-foreground">
                Two-factor authentication
              </Label>
            </div>
          </div>
          <SaveButton onClick={handleSave} />
        </SettingCard>

        <SettingCard title="Notification Settings">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Email Notifications</p>
                <p className="text-xs text-muted-foreground">Receive updates via email</p>
              </div>
              <Switch checked={emailNotif} onCheckedChange={setEmailNotif} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">SMS Notifications</p>
                <p className="text-xs text-muted-foreground">Receive updates via SMS</p>
              </div>
              <Switch checked={smsNotif} onCheckedChange={setSmsNotif} />
            </div>
          </div>
          <SaveButton onClick={handleSave} />
        </SettingCard>

        <SettingCard title="General Settings">
          <div className="space-y-4">
            <div>
              <Label className="mb-1.5 block text-sm text-muted-foreground">Timezone</Label>
              <select className={selectClass}>
                <option value="">Select timezone</option>
                <option value="UTC">UTC</option>
                <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                <option value="America/New_York">America/New_York (EST)</option>
                <option value="Europe/London">Europe/London (GMT)</option>
              </select>
            </div>
            <div>
              <Label className="mb-1.5 block text-sm text-muted-foreground">Language</Label>
              <select className={selectClass}>
                <option value="">Select language</option>
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="es">Spanish</option>
              </select>
            </div>
          </div>
          <SaveButton onClick={handleSave} />
        </SettingCard>
      </div>
    </div>
  );
}
