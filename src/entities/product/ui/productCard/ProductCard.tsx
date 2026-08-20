import Image from 'next/image';
import { ProductCardProps } from '../../types';
import styles from './product-card.module.scss';






export function ProductCard({
  name,
  imgPath,
  priceDollars,
  description,
  actions,
}: ProductCardProps) {
    return (
        <div className={styles.productContainer}> 
            <Image 
                src={imgPath} 
                className={styles.productImg} 
                width={300} height={300}
                alt={name}
            />
          <h1 className={styles.productName}>{name}</h1>
            <p className={styles.productDescription}>{description}</p>
            <span className={styles.productPrice}>$ {priceDollars}</span>
          <div className={styles.actions}>{actions}</div>
        </div> 
    );
};