import Image from 'next/image';
import { ProductCardProps } from '../../types';
import styles from './product-card.module.scss';






export async function ProductCard({name, imgPath, priceDollars, description}: ProductCardProps) {


    return (
        <div className={styles.productContainer}> 
            <Image 
                src={imgPath} 
                className={styles.productImg} 
                width={300} height={300}
                alt={name}
            />
            <h2 className={styles.productName}>{name}</h2>
            <p className={styles.productDescription}>{description}</p>
            <span className={styles.productPrice}>$ {priceDollars}</span>
            <button className={styles.buyBtn}>Add to cart</button>
        </div> 
    );
};