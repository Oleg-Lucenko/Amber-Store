'use client'

import { ProductListItem } from "@entities/product";

import { AddToCartButton } from "@features/cart";

import { ProductListProps } from "@entities/product/types";
import styles from "./products-list.module.scss";

export function ProductsList({ listName, products }: ProductListProps ) {
  return (
    <>
      {listName && <h1 className={styles.categoryName}>{listName}</h1>}

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
    </>
  );
}
