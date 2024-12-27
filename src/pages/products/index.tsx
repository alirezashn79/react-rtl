import Loading from "@/components/module/Loading";
import Header from "@/components/template/Products/Header";
import ProductCard from "@/components/template/Products/ProductCard";
import { Separator } from "@/components/ui/separator";
import { useProduct } from "@/store";
import { Product } from "@/types";
import axios from "axios";
import { useEffect } from "react";
import useSwr from "swr";

const fetcher = async () => {
  const res = await axios.get<Product[]>("https://fakestoreapi.com/products");
  return res.data;
};

export default function Products() {
  // state
  const { products, filteredProducts, setProducts } = useProduct();

  const { data, isLoading } = useSwr<Product[]>("products", fetcher);

  useEffect(() => {
    if (data) setProducts(data);
  }, [data, setProducts]);

  const productsList =
    filteredProducts && filteredProducts?.length > 0
      ? filteredProducts
      : products;

  return (
    <div className="container p-4 mx-auto">
      <Header />
      <Separator className="my-2" />
      <main>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
            {productsList?.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
