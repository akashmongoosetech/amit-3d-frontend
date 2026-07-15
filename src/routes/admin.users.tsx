import { createFileRoute } from "@tanstack/react-router";
import { Search, Plus, Users, ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { EmptyState } from "@/components/admin/EmptyState";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export const Route = createFileRoute("/admin/users")({
  head: () => ({
    meta: [
      { title: "Users — Verto3D Admin" },
    ],
  }),
  component: UsersPage,
});

const sampleUsers = [
  { name: "Rahul Sharma", email: "rahul@example.com", role: "Admin", status: "Active", joined: "Jan 2026" },
  { name: "Priya Patel", email: "priya@example.com", role: "Editor", status: "Active", joined: "Mar 2026" },
  { name: "Amit Singh", email: "amit@example.com", role: "Viewer", status: "Inactive", joined: "Apr 2026" },
  { name: "Sneha Gupta", email: "sneha@example.com", role: "Editor", status: "Active", joined: "May 2026" },
  { name: "Vikram Joshi", email: "vikram@example.com", role: "Viewer", status: "Active", joined: "Jun 2026" },
];

const inputClass =
  "w-full rounded-xl border border-input bg-black/40 px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring";

function UsersPage() {
  const [search, setSearch] = useState("");

  const filtered = sampleUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );

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

      {filtered.length > 0 ? (
        <div className="overflow-hidden rounded-xl border border-border">
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
              {filtered.map((u) => (
                <tr key={u.email} className="border-b border-border last:border-0 hover:bg-card/20">
                  <td className="px-5 py-3.5 font-medium text-foreground">{u.name}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{u.email}</td>
                  <td className="hidden px-5 py-3.5 text-muted-foreground sm:table-cell">{u.role}</td>
                  <td className="px-5 py-3.5">
                    <Badge
                      variant={u.status === "Active" ? "default" : "secondary"}
                      className="text-[10px]"
                    >
                      {u.status}
                    </Badge>
                  </td>
                  <td className="hidden px-5 py-3.5 text-muted-foreground md:table-cell">{u.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState
          icon={Users}
          title="No users found"
          description={search ? "Try a different search term." : "No users have been created yet."}
        />
      )}
    </div>
  );
}
