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
  return (
    <div>
      <select
        onChange={onChangeSelect}
        name="category"
        id="category"
        className="px-4 py-1 border"
      >
        <option value="all">all</option>
        <option value="men's clothing">men's clothing</option>
        <option value="jewelery">jewelery</option>
        <option value="electronics">electronics</option>
        <option value="women's clothing">women's clothing</option>
      </select>
    </div>
  );
}
