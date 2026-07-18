import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { api } from "@/lib/api";

export interface AdminUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  username: string;
  profileImage: string;
  role: "admin" | "superadmin";
  isActive: boolean;
}

interface AdminAuthContextValue {
  isAuthenticated: boolean;
  user: AdminUser | null;
  token: string | null;
  profileImage: string | null;
  updateProfileImage: (dataUrl: string | null) => void;
  login: (identifier: string, password: string) => Promise<void>;
  signup: (data: SignupPayload) => Promise<void>;
  logout: () => void;
}

export interface SignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  username: string;
  password: string;
  confirmPassword: string;
  profileImage?: string;
  profileImageFile?: File;
}

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

const STORAGE_KEY = "verto3d_admin_session";
const PROFILE_KEY = "verto3d_admin_profile_image";

interface StoredSession {
  token: string;
  admin: AdminUser;
}

function loadSession(): StoredSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredSession) : null;
  } catch {
    return null;
  }
}

function saveSession(session: StoredSession) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    /* ignore */
  }
}

function clearSession() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(PROFILE_KEY);
  } catch {
    /* ignore */
  }
}

function loadProfileImage(): string | null {
  try {
    const val = localStorage.getItem(PROFILE_KEY);
    if (!val || val.startsWith("blob:") || val === "null" || val === "undefined") {
      if (val) localStorage.removeItem(PROFILE_KEY);
      return null;
    }
    return val;
  } catch {
    return null;
  }
}

function isValidImage(val: string): boolean {
  return val.startsWith("data:image/") && val.includes("base64,");
}

function saveProfileImage(dataUrl: string | null) {
  try {
    if (dataUrl) {
      localStorage.setItem(PROFILE_KEY, dataUrl);
    } else {
      localStorage.removeItem(PROFILE_KEY);
    }
  } catch {
    /* ignore */
  }
}

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [profileImage, setProfileImageState] = useState<string | null>(loadProfileImage);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = loadSession();
    if (!stored) {
      setReady(true);
      return;
    }

    api
      .get<AdminUser>("/auth/me")
      .then((admin) => {
        saveSession({ token: stored.token, admin });
        setToken(stored.token);
        setUser(admin);
        if (admin.profileImage && isValidImage(admin.profileImage)) {
          saveProfileImage(admin.profileImage);
          setProfileImageState(admin.profileImage);
        }
      })
      .catch(() => {
        clearSession();
        setToken(null);
        setUser(null);
      })
      .finally(() => setReady(true));
  }, []);

  const isAuthenticated = !!token && !!user;

  const updateProfileImage = useCallback((dataUrl: string | null) => {
    saveProfileImage(dataUrl);
    setProfileImageState(dataUrl);
  }, []);

  const login = useCallback(async (identifier: string, password: string) => {
    const data = await api.post<{ admin: AdminUser; token: string }>("/auth/login", {
      identifier,
      password,
    });

    saveSession({ token: data.token, admin: data.admin });
    setToken(data.token);
    setUser(data.admin);
    if (data.admin.profileImage && isValidImage(data.admin.profileImage)) {
      saveProfileImage(data.admin.profileImage);
      setProfileImageState(data.admin.profileImage);
    }
  }, []);

  const signup = useCallback(async (payload: SignupPayload) => {
    if (payload.profileImageFile) {
      const formData = new FormData();
      formData.append("firstName", payload.firstName);
      formData.append("lastName", payload.lastName);
      formData.append("email", payload.email);
      formData.append("mobile", payload.mobile);
      formData.append("username", payload.username);
      formData.append("password", payload.password);
      formData.append("confirmPassword", payload.confirmPassword);
      formData.append("profileImage", payload.profileImageFile);

      const data = await api.postFormData<{ admin: AdminUser; token: string }>("/auth/signup", formData);
      saveSession({ token: data.token, admin: data.admin });
      setToken(data.token);
      setUser(data.admin);
    } else {
      if (payload.profileImage && isValidImage(payload.profileImage)) {
        saveProfileImage(payload.profileImage);
        setProfileImageState(payload.profileImage);
      }

      const data = await api.post<{ admin: AdminUser; token: string }>("/auth/signup", payload);

      saveSession({ token: data.token, admin: data.admin });
      setToken(data.token);
      setUser(data.admin);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      /* ignore */
    }
    clearSession();
    setToken(null);
    setUser(null);
    setProfileImageState(null);
  }, []);

  if (!ready) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background">
        <div className="size-6 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    );
  }

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated,
        user,
        token,
        profileImage,
        updateProfileImage,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth(): AdminAuthContextValue {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
