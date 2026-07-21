import styles from './error.module.scss';
import Link from "next/link";


export function UncaughtError({requested, reset}: {requested: string | null, reset: () => void}) {
    
    return (
        <div className={styles.errorWrapper}>

            <div className={styles.errorContent}>
                {requested ? 
                    <h2 className={styles.uncaughtErrHead}>Failed to fetch {requested}.</h2> 
                        : 
                    <h2 className={styles.uncaughtErrHead}>Something went wrong.</h2>
                }

                <div className={styles.actionsContainer}>
                    <button onClick={() => reset()} className={styles.tryAgainBtn}>Try again</button>
                    <Link href="/" className={styles.action}>Home page</Link>
                </div>
            </div>

        </div>
    );
};
