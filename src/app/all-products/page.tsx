import { ProductsList } from "@widgets/products-list/ProductsList";
import { getAllProducts } from "@entities/product/api/queries";
import { NoProducts, validateProductsQuery } from "@entities/product";
import { notFound } from "next/navigation";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function AllProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const searchParamsData = await searchParams;
  const catalogQuery = validateProductsQuery(searchParamsData);

  if (catalogQuery === null) {
    notFound();
  }



  const { products, totalPages } = await getAllProducts(catalogQuery);

  if (products.length === 0) {
    return <NoProducts />;
  }

  return (
    <ProductsList
      listName={"All products"}
      products={products}
      totalPages={totalPages}
      catalogQuery={catalogQuery}
    />
  );
}
