import { ProductsList } from "@widgets/products-list/ProductsList";
import { getCategoryWithProducts } from "@entities/product/actions";
import { EmptyCategory, validateProductsQuery } from "@entities/product";
import { notFound } from "next/navigation";


type params = Promise<{ categorySlug: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;


export default async function ProductsByCategoryPage(
  {params, searchParams}: { params: params, 
  searchParams: SearchParams}
) {
   const { categorySlug } = await params;
  const searchParamsData = await searchParams;

  const sort = validateProductsQuery(searchParamsData);

  if (sort === null) {
    notFound();
  }

  const categoryProducts = await getCategoryWithProducts(
    categorySlug,
    sort
  );

  if (categoryProducts === null) {
    notFound();
  }

  const { category, products } = categoryProducts;

  if (products.length === 0) {
    return <EmptyCategory />;
  }

  return (
    <ProductsList
      products={products}
      listName={category.name}
      sort={sort}
    />
  );
};
