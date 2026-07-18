import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Users, Mail, ShoppingCart, Settings, CalendarCheck, Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  onNav?: () => void;
}

const navItems = [
  { label: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Users", to: "/admin/users", icon: Users },
  { label: "Contacts", to: "/admin/contacts", icon: Mail },
  { label: "Subscribers", to: "/admin/subscribers", icon: Newspaper },
  { label: "Bookings", to: "/admin/bookings", icon: CalendarCheck },
  { label: "Orders", to: "/admin/orders", icon: ShoppingCart },
  { label: "Settings", to: "/admin/settings", icon: Settings },
];

export function Sidebar({ onNav }: SidebarProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => {
        const active = pathname === item.to;
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNav}
            className={cn(
              "group flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200",
              active
                ? "bg-accent/10 text-accent"
                : "text-muted-foreground hover:bg-card/50 hover:text-foreground",
            )}
          >
            <Icon
              className={cn(
                "size-[18px] shrink-0 transition-colors duration-200",
                active ? "text-accent" : "text-muted-foreground group-hover:text-foreground",
              )}
            />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
