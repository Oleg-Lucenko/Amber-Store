import Link from "next/link";
import styles from './no-products.module.scss';




export function EmptyCategory() {
    
    return (
    <div className={styles.wrapper}>
        <div className={styles.content}>
            <p> No products in this category yet. </p>
            <Link href="/" className={styles.action}>Home page</Link>
        </div>
    </div>
    )
}