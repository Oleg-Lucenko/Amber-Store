'use client'

import { ProductListItem } from "@entities/product";

import { AddToCartButton } from "@features/cart";

import { ProductListProps } from "@entities/product/model/types";
import styles from "./products-list.module.scss";
import Link from "next/link";

export function ProductsList({ listName, products, sort }: ProductListProps ) {


  return (
    <>
      <div className={styles.sortContainer}>
        <Link href='?sort=asc' className={`${styles.sortBtn} ${sort==='asc' ? styles.active : ''} `}>Lowest price first</Link>
        <Link href='?sort=desc' className={`${styles.sortBtn} ${sort==='desc' ? styles.active : ''} `}>Highest price first</Link>
      </div>

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
