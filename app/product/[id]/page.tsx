import Image from 'next/image'
import {PageParams} from '../../../types/PageParams';
import {Product} from '../../../types/Product';


  
export default async function ProductPage({params}: PageParams) {
    const { id } = await params;
    const res = await fetch(`http://localhost:3001/product/${id}`);
    const product: Product | null = await res.json();
    console.log(product);
    if (!product) return <p>Product not found</p>;
  
    return (
        <div className="product-container"> 
            <Image 
                src={product.img_path} 
                className="product-img" 
                width={300} height={300}
                alt={product.name}
            />
            <h2 className="product-name">{product.name}</h2>
            <p className="product-description">{product.description}</p>
            <span className="product-price">$ {product.price}</span>
            <button className="buy-btn">Add to cart</button>
        </div> 
    );
};