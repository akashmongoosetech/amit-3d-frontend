import { useAdminAuth } from "@/context/AdminAuthContext";
import { Outlet, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Sheet, SheetContent } from "@/components/ui/sheet";

export function AdminLayout() {
  const { isAuthenticated } = useAdminAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.navigate({ to: "/admin-login" });
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return (
    <>
      {/* Desktop sidebar — fixed, stays in place */}
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-60 flex-col border-r border-border bg-card/40 lg:flex">
        <div className="shrink-0 px-6 pt-6 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-accent text-lg">⊹</span>
            <span className="text-sm font-semibold tracking-tight">Verto3D Admin</span>
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4">
          <Sidebar />
        </div>
      </aside>

      {/* Mobile sidebar — Sheet */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="flex w-60 flex-col border-r border-border bg-background p-6 pt-10">
          <div className="mb-8 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-accent text-lg">⊹</span>
              <span className="text-sm font-semibold tracking-tight">Verto3D Admin</span>
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto">
            <Sidebar onNav={() => setSidebarOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>

      {/* Main content area — natural page scroll */}
      <div className="lg:pl-60">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-5 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </>
  );
}
