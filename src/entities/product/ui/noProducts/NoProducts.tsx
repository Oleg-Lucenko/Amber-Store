import Link from "next/link";
import styles from './no-products.module.scss';



export function NoProducts() {
    
        return (
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <p>No products yet. Coming soon.</p>
                    <Link href="/" className={styles.action}>Home page</Link>
                </div>
            </div> 
        );
};

