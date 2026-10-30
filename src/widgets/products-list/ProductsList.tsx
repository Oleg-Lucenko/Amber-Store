"use client";

import { ProductListItem } from "@entities/product";
import { AddToCartButton } from "@features/cart";
import { ProductListProps } from "@entities/product/model/types";
import styles from "./products-list.module.scss";
import Pagination from "./pagination/Pagination";
import { ProductsControlls } from "./product-controls/ProductsControlls";


export function ProductsList({
  listName,
  products,
  totalPages,
  catalogQuery
}: ProductListProps) {


  return (
    <>

      {listName && <h1 className={styles.categoryName}>{listName}</h1>}

      <ProductsControlls {...catalogQuery}/>

      <ul className={styles.productsList}>
        {products.map((product) => (
          <ProductListItem
            key={product.id}
            name={product.name}
            imgPath={product.imgPath}
            slug={product.slug}
            priceDollars={product.priceDollars}
            categorySlug={product.categorySlug}
            actions={
              <AddToCartButton
                product={{
                  id: product.id,
                  name: product.name,
                  imgPath: product.imgPath,
                  priceDollars: product.priceDollars,
                  slug: product.slug,
                  categorySlug: product.categorySlug,
                }}
              />
            }
          />
        ))}
      </ul>

      {totalPages && (
        <Pagination
          totalPages={totalPages}
          catalogQuery={catalogQuery}
        />
      )}
    </>
  );
}
