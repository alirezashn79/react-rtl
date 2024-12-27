import { http, HttpResponse } from "msw";
import data from "@/mocks/mockData/products/productsData.json";

export default function productsHandler() {
  return http.get("https://fakestoreapi.com/products", () =>
    HttpResponse.json(data)
  );
}
