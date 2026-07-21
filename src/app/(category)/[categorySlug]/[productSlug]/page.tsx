import { ProductCard } from '@entities/product';
import { getProduct } from '@entities/product/actions';




  
export default async function ProductPage({params}: {params: Promise<{categorySlug: string; productSlug: string }>}) {
    const { productSlug } = await params;


        const product = await getProduct(productSlug);

        return (
            <ProductCard 
            name = {product.name}
            imgPath = {product.imgPath}
            priceDollars = {product.priceDollars}
            description = {product.description}
            />
        );
    
};