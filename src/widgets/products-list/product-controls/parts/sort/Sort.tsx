import Link from "next/link";
import { PriceSort } from "@entities/product/model/types";
import styles from "./sort.module.scss";

export function Sort({ sort }: { sort?: PriceSort }) {
  return (
    <div className={styles.sortGroup}>
      <span className={styles.heading}>Sort by price</span>
      <div className={styles.sortContainer}>
      <Link
        href="?sort=asc"
        aria-current={sort === "asc" ? "true" : undefined}
        className={`${styles.sortBtn} ${sort === "asc" ? styles.active : ""} `}
      >
        Lowest price first
      </Link>
      <Link
        href="?sort=desc"
        aria-current={sort === "desc" ? "true" : undefined}
        className={`${styles.sortBtn} ${sort === "desc" ? styles.active : ""} `}
      >
        Highest price first
      </Link>
      </div>
    </div>
  );
}
