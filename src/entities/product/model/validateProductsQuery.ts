import type { CatalogQuery } from "./types";

const AVAILABLE_KEYS: Array<keyof CatalogQuery> = [
  "page",
  "sort",
  "minPrice",
  "maxPrice",
];

export function validateProductsQuery(
  query: Record<string, string | string[] | undefined>,
): CatalogQuery | null {
  const queryKeys = Object.keys(query);

if (
  !queryKeys.every((key) =>
    AVAILABLE_KEYS.some((availableKey) => availableKey === key)
  )
) {
  return null;
};

  const validatedParams: CatalogQuery = {
    page: 1,
  };

  if (query.page !== undefined) {
    if (typeof query.page !== "string") {
      return null;
    }

    const page = Number(query.page);

    if (!Number.isInteger(page) || page <= 0) {
      return null;
    }

    validatedParams.page = page;
  }

  if (query.sort !== undefined) {
    if (query.sort !== "asc" && query.sort !== "desc") {
      return null;
    }

    validatedParams.sort = query.sort;
  }

  for (const key of ["minPrice", "maxPrice"] as const) {
    const rawPrice = query[key];

    if (rawPrice === undefined || rawPrice === "") {
      continue;
    }

    if (typeof rawPrice !== "string" || rawPrice.trim() === "") {
      return null;
    }

    const price = Number(rawPrice);
    if (!Number.isFinite(price) || price < 0 || !Number.isSafeInteger(Math.round(price * 100))) {
      return null;
    }

    validatedParams[key] = price;
  }

  if (
    validatedParams.minPrice !== undefined &&
    validatedParams.maxPrice !== undefined &&
    validatedParams.minPrice > validatedParams.maxPrice
  ) {
    return null;
  }

  return validatedParams;
}
