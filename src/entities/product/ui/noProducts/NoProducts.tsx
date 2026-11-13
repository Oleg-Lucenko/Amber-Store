import Link from "next/link";
import styles from "./no-products.module.scss";

interface NoProductsProps {
  title: string;
  message?: string;
}

export function NoProducts({ title, message }: NoProductsProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h2>{title}</h2>
        {message && <p>{message}</p>}
        <Link href="/" className={styles.action}>
          Home page
        </Link>
      </div>
    </div>
  );
}
