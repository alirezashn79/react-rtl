import { useProduct } from "@/store";
import { ChangeEvent } from "react";

export default function Filter() {
  const { products, setFilteredProducts } = useProduct();

  const onChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const categoryValue = e.target.value;
    const tempProducts = [...products!];
    const filteredProducts = tempProducts.filter(
      (product) => product.category === categoryValue
    );
    setFilteredProducts(filteredProducts);
  };

  const categories = [
    "all",
    "men's clothing",
    "jewelery",
    "electronics",
    "women's clothing",
  ];

  return (
    <div>
      <select
        onChange={onChangeSelect}
        name="category"
        id="category"
        className="px-4 py-1 border"
      >
        {categories.map((category, idx) => (
          <option key={idx} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}
