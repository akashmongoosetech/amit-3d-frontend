import { useCallback, useState, useEffect } from "react";
import { api } from "@/lib/api";

export interface DashboardSummary {
  totalBookings: number;
  totalOrders: number;
  totalContacts: number;
  activeProjects: number;
  completedProjects: number;
  deliveredModels: number;
  pendingPayments: number;
  bookingTrend: number;
  orderTrend: number;
  contactTrend: number;
  newBookings: number;
  newContacts: number;
}

export interface ChartDataPoint {
  date?: string;
  month?: string;
  year?: number;
  count?: number;
  bookings?: number;
  orders?: number;
  revenue?: number;
  customers?: number;
}

export interface StatusDistItem {
  status: string;
  count: number;
}

export interface TopModelItem {
  name: string;
  count: number;
}

export interface DashboardCharts {
  bookingStatusDist: StatusDistItem[];
  orderStatusDist: StatusDistItem[];
  monthlyBookings: ChartDataPoint[];
  revenueVsOrders: ChartDataPoint[];
  topModels: TopModelItem[];
  dailyTrend30: ChartDataPoint[];
  dailyTrend90: ChartDataPoint[];
  customerGrowth: ChartDataPoint[];
}

export interface PipelineStage {
  name: string;
  count: number;
  percentage: number;
}

export interface DashboardPipeline {
  stages: PipelineStage[];
  completionPercentage: number;
  totalInPipeline: number;
  inProgress: number;
}

export interface DashboardActivity {
  id: string;
  type: "booking" | "contact";
  action: string;
  detail: string;
  status: string;
  time: string;
}

export interface DashboardData {
  summary: DashboardSummary;
  charts: DashboardCharts;
  recentOrders: OrderItem[];
  recentContacts: Contact[];
  activities: DashboardActivity[];
  pipeline: DashboardPipeline;
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

export function useDashboardData() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async (params?: Record<string, string>) => {
    setLoading(true);
    try {
      const res = await api.get<DashboardData>("/admin/dashboard", params);
      setData(res);
    } catch {
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, refetch: fetchData };
}

export interface UsersResponse {
  admins: User[];
  pagination: PaginationInfo;
}

export function useUsers(search: string, refreshKey?: number) {
  const [data, setData] = useState<User[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    const params: Record<string, string> = { page: String(page), limit: "20" };
    if (search) params.search = search;
    api
      .get<UsersResponse>("/admin/users", params)
      .then((res) => {
        setData(res.admins);
        setPagination(res.pagination);
      })
      .catch(() => {
        setData([]);
        setPagination(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [search, refreshKey, page]);

  return { data, pagination, loading, page, setPage };
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

export interface Booking {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  modelName: string;
  modelSize: string;
  message: string;
  referenceImage: string;
  status: BookingStatus;
  orderStatus?: OrderStatus;
  createdAt: string;
}

export type BookingStatus =
  "New Order" | "Contact" | "Payment" | "Start Project" | "Complete" | "On Way" | "Delivered";

export type OrderStatus = "Start Create" | "Model Complete" | "Dispatched" | "Shipped";

export interface OrderItem {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  modelName: string;
  modelSize: string;
  message: string;
  referenceImage: string;
  status: BookingStatus;
  orderStatus: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface OrdersResponse {
  orders: OrderItem[];
  pagination: PaginationInfo;
}

export interface BookingFilters {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface BookingsResponse {
  bookings: Booking[];
  pagination: PaginationInfo;
}

export function useBookings() {
  const [data, setData] = useState<Booking[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(false);

  const search = useCallback(async (filters: BookingFilters) => {
    setLoading(true);
    const params: Record<string, string> = {};
    if (filters.search) params.search = filters.search.trim();
    if (filters.status && filters.status !== "All") params.status = filters.status;
    if (filters.page) params.page = String(filters.page);
    if (filters.limit) params.limit = String(filters.limit);
    if (filters.sortBy) params.sortBy = filters.sortBy;
    if (filters.sortOrder) params.sortOrder = filters.sortOrder;

    try {
      const res = await api.get<BookingsResponse>("/book-model", params);
      setData(res.bookings);
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

export function updateBookingStatus(id: string, status: BookingStatus) {
  return api.patch<Booking>(`/book-model/${id}/status`, { status });
}

export function deleteBooking(id: string) {
  return api.del<null>(`/book-model/${id}`);
}

export async function getBookingStatuses(): Promise<string[]> {
  const data = await api.get<string[]>("/book-model/statuses");
  return data;
}

export function useOrdersData() {
  const [data, setData] = useState<OrderItem[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(false);

  const search = useCallback(async (filters: BookingFilters) => {
    setLoading(true);
    const params: Record<string, string> = {};
    if (filters.search) params.search = filters.search.trim();
    if (filters.page) params.page = String(filters.page);
    if (filters.limit) params.limit = String(filters.limit);
    if (filters.sortBy) params.sortBy = filters.sortBy;
    if (filters.sortOrder) params.sortOrder = filters.sortOrder;

    try {
      const res = await api.get<OrdersResponse>("/orders", params);
      setData(res.orders);
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

export function getOrderById(id: string) {
  return api.get<OrderItem>(`/orders/${id}`);
}

export function updateOrderOrderStatus(id: string, orderStatus: OrderStatus) {
  return api.patch<OrderItem>(`/orders/${id}/status`, { orderStatus });
}

export interface AdminProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  username: string;
  profileImage: string;
  role: string;
}

export function getAdminProfile() {
  return api.get<AdminProfile>("/admin/profile");
}

export function updateAdminProfile(formData: FormData) {
  return api.putFormData<AdminProfile>("/admin/profile", formData);
}

export function changeAdminPassword(data: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}) {
  return api.put<null>("/admin/change-password", data);
}
