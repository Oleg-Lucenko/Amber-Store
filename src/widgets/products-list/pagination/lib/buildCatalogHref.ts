import { CatalogQuery } from "@entities/product/model/types";

export function buildCatalogHref({
  page,
  sort,
  minPrice,
  maxPrice,
}: CatalogQuery): string {
  const params = new URLSearchParams();

  params.set("page", String(page));

  if (sort !== undefined) {
    params.set("sort", sort);
  }

  if (minPrice !== undefined) {
    params.set("minPrice", String(minPrice));
  }

  if (maxPrice !== undefined) {
    params.set("maxPrice", String(maxPrice));
  }

  return `?${params.toString()}`;
}
