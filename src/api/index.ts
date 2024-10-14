import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import products from "../data/products.json";
import { Product, SortableColumns, SortOrder } from "@/types";

const mock = new AxiosMockAdapter(axios);

mock.onGet("/products").reply((config) => {
  const { query, sortBy, sortOrder } = config.params as {
    query: string;
    sortBy: SortableColumns;
    sortOrder: SortOrder;
  };
  let filteredProducts = [...products];
  filteredProducts.sort((a, b) => {
    if (typeof a[sortBy] === "string") {
      return sortOrder === "asc"
        ? a[sortBy].localeCompare(b[sortBy] as string)
        : (b[sortBy] as string).localeCompare(a[sortBy]);
    } else {
      return sortOrder === "asc"
        ? a[sortBy] - (b[sortBy] as number)
        : (b[sortBy] as number) - a[sortBy];
    }
  });

  if (query)
    filteredProducts = filteredProducts.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );

  return [200, { products: filteredProducts }];
});

export function getProducts({
  query = "",
  sortBy,
  sortOrder,
}: {
  query: string;
  sortBy: SortableColumns;
  sortOrder: SortOrder;
}) {
  return axios
    .get(`/products`, { params: { query, sortBy, sortOrder } })
    .then((res) => res.data);
}
