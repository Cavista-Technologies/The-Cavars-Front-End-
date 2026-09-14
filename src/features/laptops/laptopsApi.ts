import { apiClient } from "../../lib/apiClient";
import type { RemoteLaptopHistory } from "./types";

export interface RemoteUserLaptop {
  id: string;
  userId: string | null;
  laptopNumber: string;
  assetName: string;
  model: string;
  comment: string;
  assetLocation: string;
  employeeDepartment: string;
  condition?: number;
  assignedToName: string;
  assignedToEmail: string;
  status: string | number | null;
  price: number;
  currency?: string | null;
  receiptUrl?: string | null;
  receipt?: string | null;
  estimationUsefulLifeYear: string | null;
  depreciationEstimationDate: string | null;
  warrantyExpirationDate: string | null;
  purchaseYear: string | null;
  laptopHistories?: RemoteLaptopHistory[];
}

export interface PaginatedListOfUserLaptop {
  pageIndex: number;
  totalPages: number;
  item: RemoteUserLaptop[];
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface CreateLaptopInput {
  laptopNumber: string;
  assetName: string;
  model: string;
  comment: string;
  assetLocation: string;
  employeeDepartment: string;
  price: number;
  currency: string;
  receipt?: string | null;
  estimationUsefulLifeYear: string;
  depreciationEstimationDate: string;
  warrantyExpirationDate: string;
  purchaseYear: string;
}

export interface UpdateLaptopInput {
  userID: string | null;
  status: number;
  comment: string | null;
}

export interface LaptopDashboardMetrics {
  total: number;
  available: number;
  assigned: number;
  inRepair: number;
}

export async function getLaptops(
  pageNumber = 1,
  pageSize = 20,
): Promise<PaginatedListOfUserLaptop> {
  const { data } = await apiClient.get<PaginatedListOfUserLaptop>(
    "/api/laptops",
    {
      params: { pageNumber, pageSize },
    },
  );
  return data;
}

export async function searchLaptops(
  search: string,
  pageNumber = 1,
  pageSize = 20,
): Promise<PaginatedListOfUserLaptop> {
  const { data } = await apiClient.get<PaginatedListOfUserLaptop>(
    `/api/laptops/?searchString=${encodeURIComponent(search)}`,
    { params: { pageNumber, pageSize } },
  );
  return data;
}

export async function getCurrentUserLaptops(
  pageNumber = 1,
  pageSize = 20,
): Promise<PaginatedListOfUserLaptop> {
  const { data } = await apiClient.get<PaginatedListOfUserLaptop>(
    "/api/laptops/current-user",
    { params: { pageNumber, pageSize } },
  );
  return data;
}

export async function createLaptop(input: CreateLaptopInput): Promise<string> {
  const { data } = await apiClient.post<{ laptopId: string }>(
    "/api/laptops/create",
    input,
  );
  return data.laptopId;
}

export async function getLaptopDashboardMetrics(): Promise<LaptopDashboardMetrics> {
  const { data } = await apiClient.get<LaptopDashboardMetrics>(
    "/api/laptops/dashboard-metric",
  );
  return data;
}

export async function updateLaptop(
  laptopId: string,
  input: UpdateLaptopInput,
): Promise<void> {
  await apiClient.put(`/api/laptops/update/${laptopId}`, input);
}
