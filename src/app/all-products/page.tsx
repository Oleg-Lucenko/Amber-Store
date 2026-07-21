import { ProductsList } from "@widgets/products-list/ProductsList";
import { getAllProducts } from "@entities/product/actions";
import { NoProducts } from "@entities/product";
import { notFound } from "next/navigation";

export default async function AllProductsPage() {
  const products = await getAllProducts();

  if (products.length === 0) {
    return <NoProducts />;
  }

  return <ProductsList listName={'All products'} products={products} />;
}
