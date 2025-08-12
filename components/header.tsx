import Link from 'next/link';
import { Categories } from '../types/Categories'

export default async function header({categories}: Categories) {


    return (

        <header>
            <div className="header-top">
                <div className="number-container">
                    <p>Speak to the manager on:</p>
                    <Link href="tel:0333-700-54-16">0333-700-54-16</Link>
                </div>

                <div className="account-actions">
                    <Link href="#" className="sign-in">Sign in</Link>
                    <Link href="#" className="register">Register</Link>
                </div>
            </div>


            <div className="header-middle">

                <div className="header-middle-left">
                    
                    <Link href="/"><img src="/img/logo.png" className="logo" alt='logo'/></Link>
            
                    <nav>
                        <ul className="nav-list">
                            {categories.map(category => (
                                <li key={category.id}>
                                    <Link href={`/products-by-category/${category.id}`} className='nav-link'>
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                </div>

                
                <Link href="#" className="cart">Cart</Link>

            </div>
            
        </header>
        
    );

};
