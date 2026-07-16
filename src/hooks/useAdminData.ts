import { useCallback, useState, useEffect } from "react";
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
  mobile: string;
  company: string;
  budget: string;
  message: string;
  status: "New" | "Pending" | "Talk" | "Resolved";
  createdAt: string;
}

export type ContactStatus = Contact["status"];

export interface ContactFilters {
  search?: string;
  status?: string;
  fromDate?: string;
  toDate?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginationInfo {
  page: number;
  limit: number;
  totalRecords: number;
  totalPages: number;
}

export interface ContactsResponse {
  contacts: Contact[];
  pagination: PaginationInfo;
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

export function useContacts() {
  const [data, setData] = useState<Contact[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(false);

  const search = useCallback(async (filters: ContactFilters) => {
    setLoading(true);
    const params: Record<string, string> = {};
    if (filters.search) params.search = filters.search.trim();
    if (filters.status && filters.status !== "All") params.status = filters.status;
    if (filters.fromDate) params.fromDate = filters.fromDate;
    if (filters.toDate) params.toDate = filters.toDate;
    if (filters.page) params.page = String(filters.page);
    if (filters.limit) params.limit = String(filters.limit);
    if (filters.sortBy) params.sortBy = filters.sortBy;
    if (filters.sortOrder) params.sortOrder = filters.sortOrder;

    try {
      const res = await api.get<ContactsResponse>("/contact", params);
      setData(res.contacts);
      setPagination(res.pagination);
    } catch {
      setData([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, pagination, loading, search };
}

export function updateContactStatus(id: string, status: ContactStatus) {
  return api.patch<Contact>(`/contact/${id}/status`, { status });
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
