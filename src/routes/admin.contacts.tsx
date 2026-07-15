import { createFileRoute } from "@tanstack/react-router";
import { Search, Mail } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { EmptyState } from "@/components/admin/EmptyState";
import { useContacts } from "@/hooks/useAdminData";
import type { Contact } from "@/hooks/useAdminData";

export const Route = createFileRoute("/admin/contacts")({
  head: () => ({
    meta: [
      { title: "Contacts — Verto3D Admin" },
    ],
  }),
  component: ContactsPage,
});

const inputClass =
  "w-full rounded-xl border border-input bg-black/40 px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring";

function ContactsPage() {
  const [search, setSearch] = useState("");
  const { data: contacts, loading } = useContacts(search);

  return (
    <div>
      <PageHeader
        title="Contacts"
        description="Messages and inquiries from visitors"
      />

      <div className="mb-5 max-w-sm">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search contacts…"
            className={inputClass}
            style={{ paddingLeft: "2.5rem" }}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 text-sm text-muted-foreground">Loading contacts...</div>
      ) : contacts.length > 0 ? (
        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-card/30 text-left text-xs uppercase text-muted-foreground">
                <th className="px-5 py-3.5 font-medium">Name</th>
                <th className="px-5 py-3.5 font-medium">Email</th>
                <th className="hidden px-5 py-3.5 font-medium sm:table-cell">Company</th>
                <th className="hidden px-5 py-3.5 font-medium md:table-cell">Subject</th>
                <th className="px-5 py-3.5 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c: Contact) => (
                <tr key={c._id || c.email} className="border-b border-border last:border-0 hover:bg-card/20">
                  <td className="px-5 py-3.5 font-medium text-foreground">{c.name}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{c.email}</td>
                  <td className="hidden px-5 py-3.5 text-muted-foreground sm:table-cell">{c.company}</td>
                  <td className="hidden px-5 py-3.5 text-muted-foreground md:table-cell">{c.subject}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">
                    {c.createdAt ? new Date(c.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState
          icon={Mail}
          title="No contacts found"
          description={search ? "Try a different search term." : "No contact messages yet."}
        />
      )}
    </div>
  );
}
