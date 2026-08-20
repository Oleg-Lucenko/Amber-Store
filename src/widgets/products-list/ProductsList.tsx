'use client'

import { ProductListItem, ProductWithCategoryUI } from '@entities/product';
import styles from './products-list.module.scss';

import { AddToCartButton } from "@features/cart";

export function ProductsList({products}: {products: ProductWithCategoryUI[]}) {

    return (

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

    );
};
