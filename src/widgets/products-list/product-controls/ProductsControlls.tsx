"use client";

import { validateProductsQuery } from "@entities/product/model/validateProductsQuery";
import { Sort } from "./parts/sort/Sort";
import { useSearchParams } from "next/navigation";
import { CatalogQuery } from "@entities/product/model/types";
import { PriceRange } from "./parts/price-range/PriceRange";
import styles from "./product-controlls.module.scss";

export function ProductsControlls({sort, minPrice, maxPrice}: CatalogQuery ) {
  const searchParams = useSearchParams();
  const rawQuery = Object.fromEntries(searchParams.entries());
  const queryParams = validateProductsQuery(rawQuery);

  if (queryParams === null) {
    throw new Error(
      "ProductsControls received invalid URL parameters",
    );
  };

  return (
    <div className={styles.controls}>
      <PriceRange minPrice={minPrice} maxPrice={maxPrice}/>
      <Sort sort={sort} />
    </div>
  );
};
