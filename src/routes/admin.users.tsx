import { createFileRoute } from "@tanstack/react-router";
import { Search, Plus, Users as UsersIcon } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { EmptyState } from "@/components/admin/EmptyState";
import { Badge } from "@/components/ui/badge";
import { useUsers } from "@/hooks/useAdminData";
import type { User } from "@/hooks/useAdminData";

export const Route = createFileRoute("/admin/users")({
  head: () => ({
    meta: [
      { title: "Users — Verto3D Admin" },
    ],
  }),
  component: UsersPage,
});

const inputClass =
  "w-full rounded-xl border border-input bg-black/40 px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring";

function UsersPage() {
  const [search, setSearch] = useState("");
  const { data: users, loading } = useUsers(search);

  return (
    <div>
      <PageHeader
        title="Users"
        description="Manage administrator accounts"
        actions={
          <button className="btn-pill bg-primary px-5 py-2.5 text-sm text-primary-foreground hover:bg-accent hover:text-accent-foreground">
            <Plus className="size-4" />
            Add User
          </button>
        }
      />

      <div className="mb-5 max-w-sm">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users…"
            className={inputClass}
            style={{ paddingLeft: "2.5rem" }}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 text-sm text-muted-foreground">Loading users...</div>
      ) : users.length > 0 ? (
        <div className="overflow-x-auto rounded-xl border border-border">
          <div className="min-w-160">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-card/30 text-left text-xs uppercase text-muted-foreground">
                <th className="px-5 py-3.5 font-medium">Name</th>
                <th className="px-5 py-3.5 font-medium">Email</th>
                <th className="hidden px-5 py-3.5 font-medium sm:table-cell">Role</th>
                <th className="px-5 py-3.5 font-medium">Status</th>
                <th className="hidden px-5 py-3.5 font-medium md:table-cell">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u: User) => (
                <tr key={u._id || u.email} className="border-b border-border last:border-0 hover:bg-card/20">
                  <td className="px-5 py-3.5 font-medium text-foreground">
                    {u.firstName} {u.lastName}
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">{u.email}</td>
                  <td className="hidden px-5 py-3.5 text-muted-foreground sm:table-cell">{u.role}</td>
                  <td className="px-5 py-3.5">
                    <Badge
                      variant={u.isActive ? "default" : "secondary"}
                      className="text-[10px]"
                    >
                      {u.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                  <td className="hidden px-5 py-3.5 text-muted-foreground md:table-cell">
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" }) : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      ) : (
        <EmptyState
          icon={UsersIcon}
          title="No users found"
          description={search ? "Try a different search term." : "No users have been created yet."}
        />
      )}
    </div>
  );
}
