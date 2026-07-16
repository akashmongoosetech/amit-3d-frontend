import { useRouterState } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { ProfileDropdown } from "./ProfileDropdown";

interface HeaderProps {
  title?: string;
  onMenuClick?: () => void;
}

const routeTitles: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/users": "Users",
  "/admin/contacts": "Contacts",
  "/admin/bookings": "Bookings",
  "/admin/orders": "Orders",
  "/admin/settings": "Settings",
};

export function Header({ title, onMenuClick }: HeaderProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const pageTitle = title ?? routeTitles[pathname] ?? "Admin";

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/80 px-5 py-3 backdrop-blur-md sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="text-muted-foreground hover:text-foreground lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </button>
        <h1 className="heading-display text-lg sm:text-xl">{pageTitle}</h1>
      </div>
      <ProfileDropdown />
    </header>
  );
}
