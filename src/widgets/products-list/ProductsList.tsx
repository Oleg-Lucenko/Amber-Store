'use client'

import { ProductListItem, ProductWithCategoryUI } from '@entities/product';
import styles from './products-list.module.scss';


export function ProductsList({products}: {products: ProductWithCategoryUI[]}) {

    return (

       <ul className={styles.productsList}>
                {products.map(product => 

                        <ProductListItem key={product.id}
                            name = {product.name} 
                            imgPath = {product.imgPath}
                            slug = {product.slug}
                            priceDollars = {product.priceDollars} 
                            categorySlug = {product.categorySlug} 
                            />
                    )        
                }
        </ul>

    );
};
