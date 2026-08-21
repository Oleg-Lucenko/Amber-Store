import styles from './header.module.scss'; 
import Link from 'next/link';
import Image from 'next/image';
import SignInIcon from '@images/sign-in.svg';
import RegisterIcon from '@images/register.svg';
import type { Category } from '@entities/category/types';
import { Cart } from "@features/cart";
import { HeaderNav } from './HeaderNav';



export default function Header({categories}: {categories: Category[]}) {

    return (

        <header className={styles.header}>
            <div className={styles.headerTop}>
                <div className={styles.numberContainer}>
                    <p>Speak to the manager on:</p>
                    <Link href="tel:0333-700-54-16">0333-700-54-16</Link>
                </div>

                <div className={styles.accountActions}>
                    <Link href="#" className={styles.signIn}>
                        <SignInIcon className={styles.signInIcon}/>
                        <span>Sign in</span>
                    </Link>
                    <Link href="#" className={styles.register}>
                        <RegisterIcon className={styles.registerIcon}/>
                        <span>Register</span>
                    </Link>
                </div>
            </div>


            <div className={styles.headerMain}>

                <div className={styles.headerLogoContainer}>
                    
                    <Link href="/"><Image src="/img/logo.png" width={100} height={70} className={styles.logo} alt='logo'/></Link>
            
                    <HeaderNav categories={categories} />

                </div>

                
                <Cart />

            </div>
            
        </header>
        
    );

};
