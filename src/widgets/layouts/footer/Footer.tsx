import styles from './footer.module.scss';
import Link from 'next/link';
import Image from "next/image";
import type { Category } from '@entities/category/types';





export default async function Footer({categories}: {categories: Category[]}) {

    return(
        <footer className={styles.footer}>
        
            <div className={styles.amberAbout}>
                <Link href="/"><Image src="/img/logo2.png" height={120} width={140} className={styles.logo2} alt='logo'/></Link>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex sapiente, nam numquam suscipit laudantium, quae quos vero possimus natus excepturi itaque, sit non ad eveniet aperiam reprehenderit doloribus quasi.</p>
            </div>
            
            <nav aria-label='Footer navigation' className={styles.navigation}>           
                <section className={styles.categories}>
                    <h3>Products</h3>
                            <ul>
                                <li key={1}>
                                        <Link href={'/all-products'} className={styles.navLink}>
                                            All products
                                        </Link>
                                </li>

                                {categories.map(category => (
                                            <li key={category.id}>
                                                <Link href={`/${category.name}`} className={styles.navLink}>
                                                    {category.name}
                                                </Link>
                                            </li>
                                        ))  
                                }

                            </ul>
                </section>
        
                <section className={styles.pages}>
                    <h3>Store pages</h3>
                    <ul>
                        <li><Link href='#'>About us</Link></li>
                        <li><Link href='#'>FAQs</Link></li>
                        <li><Link href='#'>Delivery information</Link></li>
                    </ul>
                </section>
            </nav> 
    
    
            <section className={styles.contacts}>
                <h3>Get in touch</h3>

                <ul>
                    <li><Link href="tel:0333-700-54-16">0333 700 54 16</Link></li>
                    <li><Link href="mailto:amberstore@gmail.com">amberstore@gmail.com</Link></li>
                </ul>
                
            </section>
        
        </footer>

    );
};
