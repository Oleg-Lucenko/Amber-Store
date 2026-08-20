import { ProductCard } from '@entities/product';
import { getProduct } from '@entities/product/actions';
import { AddToCartButton } from "@features/cart";




  
export default async function ProductPage({params}: {params: Promise<{categorySlug: string; productSlug: string }>}) {
    const { categorySlug, productSlug } = await params;

    

        const product = await getProduct(productSlug);

        return (
            <ProductCard 
            name = {product.name}
            imgPath = {product.imgPath}
            priceDollars = {product.priceDollars}
            description = {product.description}
            actions={
              <AddToCartButton
                product={{
                  id: product.id,
                  name: product.name,
                  imgPath: product.imgPath,
                  priceDollars: product.priceDollars,
                  slug: product.slug,
                  categorySlug,
                }}
              />
            }
            />
        );
    
};
