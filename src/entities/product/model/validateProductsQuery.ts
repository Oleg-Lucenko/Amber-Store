import type { QueryParams } from "./types";



const AVAILABLE_KEYS: Array<keyof QueryParams> = ["page", "sort"];

export function validateProductsQuery(
  query: Record<string, string | string[] | undefined>,
): QueryParams | null {


  const queryKeys = Object.keys(query);


  if (!queryKeys.every(key => 
    AVAILABLE_KEYS.some(availableKey => availableKey === key ))) {
    return null;
  };

  const validatedParams: QueryParams = {};

  if (query.page !== undefined) {
    if (typeof query.page !== "string") {
      return null;
    };

    const page = Number(query.page);

    if (!Number.isInteger(page) || page <= 0) {
      return null;
    };

    validatedParams.page = page;
  };

  if (query.sort !== undefined) {
    if (query.sort !== "asc" && query.sort !== "desc") {
      return null;
    };

    validatedParams.sort = query.sort;
  };

  return validatedParams;
};

