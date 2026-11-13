import { ProductsList } from "@widgets/products-list/ProductsList";
import { getCategoryWithProducts } from "@entities/product/api/queries";
import { NoProducts, validateProductsQuery } from "@entities/product";
import { notFound } from "next/navigation";

type params = Promise<{ categorySlug: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function ProductsByCategoryPage({
  params,
  searchParams,
}: {
  params: params;
  searchParams: SearchParams;
}) {
  const { categorySlug } = await params;
  const searchParamsData = await searchParams;

  const catalogQuery = validateProductsQuery(searchParamsData);

  if (catalogQuery === null) {
    notFound();
  }

  const categoryProducts = await getCategoryWithProducts(
    categorySlug,
    catalogQuery,
  );

  if (categoryProducts === null) {
    notFound();
  }

  const { category, products, isCatalogEmpty } = categoryProducts;

  if (isCatalogEmpty) {
    return <NoProducts title="No products in this category yet." />;
  }

  if (products.length === 0) {
    return <NoProducts title="No products match your filters." />;
  }

  return (
    <ProductsList
      products={products}
      listName={category.name}
      catalogQuery={catalogQuery}
    />
  );
}
