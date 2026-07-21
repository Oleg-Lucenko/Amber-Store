import Link from 'next/link';
import styles from './error.module.scss';


export function NotFoundError({requested}: {requested: string}) {


    return (

        <div className={styles.errorWrapper}>

            <div className={styles.errorContent}>
                <h2>{requested} not found</h2>
                <Link href="/" className={styles.action}>Home page</Link>
            </div>

        </div>


    );
};