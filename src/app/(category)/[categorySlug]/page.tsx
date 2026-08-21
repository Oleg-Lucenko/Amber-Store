import { ProductsList } from "@widgets/products-list/ProductsList";
import { getCategoryWithProducts } from "@entities/product/actions";
import { EmptyCategory } from "@entities/product";
import { notFound } from "next/navigation";

export default async function ProductsByCategoryPage({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;


  const categoryProducts = await getCategoryWithProducts(categorySlug);

  if (categoryProducts === null) {
    notFound();
  }

  const {category, products} = categoryProducts;

  if (products.length === 0) {
    return <EmptyCategory />;
  }

  return <ProductsList products={products} listName={category.name} />;
};
