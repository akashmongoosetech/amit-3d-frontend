import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { useRouter } from "@tanstack/react-router";

export function ProfileDropdown() {
  const { user, logout } = useAdminAuth();
  const router = useRouter();

  const initials = user
    ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
    : "AD";

  const handleLogout = () => {
    logout();
    router.navigate({ to: "/admin-login" });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="focus-visible:ring-ring rounded-full outline-none focus-visible:ring-1" aria-label="Profile menu">
          <Avatar className="size-8 cursor-pointer border border-border">
            <AvatarFallback className="bg-accent/10 text-accent text-xs font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 rounded-xl border border-border bg-card p-2 backdrop-blur-md"
      >
        <DropdownMenuLabel className="flex items-center gap-3 p-2">
          <Avatar className="size-9 border border-border">
            <AvatarFallback className="bg-accent/10 text-accent text-xs font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">
              {user?.firstName} {user?.lastName}
            </span>
            <span className="text-xs text-muted-foreground">{user?.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border" />
        <DropdownMenuItem
          onClick={handleLogout}
          className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive focus:bg-destructive/10 focus:text-destructive"
        >
          <LogOut className="size-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
