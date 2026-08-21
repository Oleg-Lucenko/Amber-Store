import DiscountsSlider from "@widgets/discount-items/DiscountsSlider";
import { ProductsList } from "@widgets/products-list/ProductsList";
import { getAllProducts } from "@entities/product/actions";
import { NoProducts } from "@entities/product";


export default async function HomePage() {
  const products = await getAllProducts();


  if (products.length === 0) {
    return <NoProducts />;
  }

  return (
    <>
      <DiscountsSlider />
      <ProductsList listName={'All products'} products={products} />
    </>
  );
}
