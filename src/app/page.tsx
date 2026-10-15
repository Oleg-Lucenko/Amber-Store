import DiscountsSlider from "@widgets/discount-items/DiscountsSlider";
import { ProductsList } from "@widgets/products-list/ProductsList";
import { getAllProducts } from "@entities/product/api/queries";
import { NoProducts, validateProductsQuery } from "@entities/product";
import { notFound } from "next/navigation";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function HomePage({searchParams}: {searchParams: SearchParams}) {

  const searchParamsData = await searchParams;
  const result = validateProductsQuery(searchParamsData);

  if (result === null) {
    notFound();
  }

  const {page = 1, sort} = result;

  const {products, totalPages} = await getAllProducts(page, sort);


  if (products.length === 0) {
    return <NoProducts />;
  }

  return (
    <>
      <DiscountsSlider />
      <ProductsList listName={'All products'} products={products} currentPage={page} totalPages={totalPages} />
    </>
  );
}
