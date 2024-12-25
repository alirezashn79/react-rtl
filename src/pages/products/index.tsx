import { useLocation } from "react-router-dom";

export default function Products() {
  const location = useLocation();
  console.log(location.state);
  return <div>Products</div>;
}
