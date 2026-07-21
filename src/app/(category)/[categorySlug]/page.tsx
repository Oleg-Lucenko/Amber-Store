import { ProductsList } from "@widgets/products-list/ProductsList";
import { getProductsByCategory } from "@entities/product/actions";
import { EmptyCategory } from "@entities/product";
import { notFound } from "next/navigation";

export default async function ProductsByCategoryPage({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;

  const products = await getProductsByCategory(categorySlug);

  if (products === null) {
    notFound();
  }

  if (products.length === 0) {
    return <EmptyCategory />;
  }

  return <ProductsList products={products} />;
};
