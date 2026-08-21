import { ProductCardProps } from "../../types";
import { formatDollars } from "@shared/lib/money";
import Image from "next/image";
import styles from "./product-card.module.scss";

export function ProductCard({
  name,
  imgPath,
  priceDollars,
  description,
  actions,
}: ProductCardProps) {
    return (
      <article className={styles.productContainer}>
        <div className={styles.imageContainer}>
          <Image
            src={imgPath}
            className={styles.productImg}
            fill
            alt={name}
            priority
          />
        </div>
        <div className={styles.productDetails}>
          <h1 className={styles.productName}>{name}</h1>
          <p className={styles.productDescription}>{description}</p>
          <span className={styles.productPrice}>{formatDollars(priceDollars)}</span>
          <div className={styles.actions}>{actions}</div>
        </div>

      </article>
    );
}
