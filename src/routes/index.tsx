import Products from "@/pages/products";
import Register from "@/pages/register";
import { Route, Routes } from "react-router-dom";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/products" element={<Products />} />
    </Routes>
  );
}
