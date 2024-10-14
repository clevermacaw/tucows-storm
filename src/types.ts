export type Product = {
  id: number;
  status: string;
  quantity: number;
  name: string;
  image: string;
  serial: string;
  total: number;
};

export type SortableColumns = "name" | "total" | "quantity";

export type SortOrder = "asc" | "desc";
