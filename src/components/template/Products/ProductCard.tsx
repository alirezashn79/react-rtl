import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/types";
import { useState } from "react";

export default function ProductCard(props: Product) {
  // hook
  const [cart, setCart] = useState(false);

  const onAdd = () => {
    setCart((prev) => !prev);
  };
  return (
    <Card data-testid="list-item">
      <CardHeader>
        <img className="aspect-square" src={props.image} alt={props.title} />
        <CardDescription className=" flex items-center justify-between">
          <div className="text-yellow-700">&#x2605; {props.rating.rate}</div>
          <div>{props.category}</div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-16">
          <CardTitle className="leading-5">{props.title}</CardTitle>
        </div>

        <p className="line-clamp-2 text-sm">{props.description}</p>
      </CardContent>
      <CardFooter>
        <Button variant={cart ? "destructive" : "default"} onClick={onAdd}>
          {cart ? "Added" : "Add To Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
}
