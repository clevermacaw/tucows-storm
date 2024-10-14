import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import products from "../data/products.json";

const mock = new AxiosMockAdapter(axios);

mock.onGet("/products").reply((config) => {
  const { query } = config.params;
  let filteredProducts = [...products];

  if (query)
    filteredProducts = filteredProducts.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );

  return [200, { products: filteredProducts }];
});

export function getProducts(query: string = "") {
  return axios.get(`/products`, { params: { query } }).then((res) => res.data);
}
