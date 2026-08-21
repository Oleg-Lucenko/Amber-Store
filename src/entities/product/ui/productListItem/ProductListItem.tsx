import type { ProductListItemProps } from "../../types";
import { formatDollars } from "@shared/lib/money";
import Image from "next/image";
import Link from "next/link";
import styles from "./product-list-item.module.scss";



export function ProductListItem({
  name,
  imgPath,
  slug,
  priceDollars,
  categorySlug,
  actions,
}: ProductListItemProps) {
    return (
        <li className={styles.productItem}>
            <Link href={`/${categorySlug}/${slug}`} className={styles.productLink}>
                <Image src={imgPath} width={120} height={120} alt={name} />
                <span className={styles.productName}>{name}</span>
                <span className={styles.productPrice}>{formatDollars(priceDollars)}</span>            
            </Link>
            {actions}
        </li>
    )
};

