import { useState, useEffect } from "react";
import { api } from "@/lib/api";

interface DashboardStats {
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
}

interface RecentOrder {
  id: string;
  customer: string;
  product: string;
  status: "Completed" | "Processing" | "Pending";
  amount: string;
  date: string;
}

interface ActivityItem {
  action: string;
  detail: string;
  time: string;
}

export interface DashboardData {
  stats: DashboardStats[];
  recentOrders: RecentOrder[];
  recentActivity: ActivityItem[];
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

export interface Contact {
  _id: string;
  name: string;
  email: string;
  company: string;
  subject: string;
  createdAt: string;
}

export interface Order {
  _id: string;
  id: string;
  customer: string;
  product: string;
  status: string;
  amount: string;
  date: string;
}

export function useDashboardData() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get<DashboardData>("/admin/dashboard")
      .then((res) => {
        setData(res);
      })
      .catch(() => {
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { data, loading };
}

export function useUsers(search: string) {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get<User[]>("/admin/users", search ? { search } : undefined)
      .then((res) => {
        setData(res);
      })
      .catch(() => {
        setData([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [search]);

  return { data, loading };
}

export function useContacts(search: string) {
  const [data, setData] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get<Contact[]>("/admin/contacts", search ? { search } : undefined)
      .then((res) => {
        setData(res);
      })
      .catch(() => {
        setData([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [search]);

  return { data, loading };
}

export function useOrders(search: string) {
  const [data, setData] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get<Order[]>("/admin/orders", search ? { search } : undefined)
      .then((res) => {
        setData(res);
      })
      .catch(() => {
        setData([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [search]);

  return { data, loading };
}
