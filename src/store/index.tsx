import { Product } from "@/types";
import { create } from "zustand";

interface UseProductsProps {
  products: Product[] | null;
  setProducts: (products: Product[] | null) => void;
  filteredProducts: Product[] | null;
  setFilteredProducts: (filteredProducts: Product[] | null) => void;
}

export const useProduct = create<UseProductsProps>((set) => ({
  products: null,
  setProducts: (products) => set({ products }),
  filteredProducts: null,
  setFilteredProducts: (filteredProducts) => set({ filteredProducts }),
}));
