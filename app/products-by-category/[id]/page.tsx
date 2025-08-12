import Link from 'next/link';
import Image from 'next/image';
import {Product} from '../../../types/Product';
import {PageParams} from '../../../types/PageParams';



 
export default async function ProductPage({params}: PageParams) {
    const { id } = await params;
    const res = await fetch(`http://localhost:3001/category/${id}/products`);
    const products: Product[] = await res.json();
    
    if (!products) return <p>Products not found</p>;
  
    return (
        <div className="products-container">
            {products.map(product => (
                <Link href={`/product/${product.id}`} key={product.id} className='product-link'>
                    <Image src={product.img_path} width={120} height={120} alt={product.name} />
                    <span className='product-name'>{product.name}</span>
                    <span className='product-price'>$ {product.price}</span>            
                </Link>
            ))}
        </div>
    );
  };