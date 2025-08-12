import Link from 'next/link';
import { Categories } from '../types/Categories'

export default async function footer({categories}: Categories) {

    return(
        <footer>
        
            <div className="footer-amber-about">
                <Link href="/"><img src="/img/logo2.png" className="logo2" alt='logo'/></Link>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex sapiente, nam numquam suscipit laudantium, quae quos vero possimus natus excepturi itaque, sit non ad eveniet aperiam reprehenderit doloribus quasi.</p>
            </div>
            
            
            <div className="footer-categories">
                <h3>Categories</h3>
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
    
            <div className="footer-pages">
                <h3>Store pages</h3>
                <ul>
                    <li><Link href='#'>About us</Link></li>
                    <li><Link href='#'>FAQs</Link></li>
                    <li><Link href='#'>Delivery information</Link></li>
                </ul>
            </div>
    
    
            <div className="footer-contacts">
                <h3>Get in touch</h3>
                <span>
                    <Link href="tel:0333-700-54-16">0333 700 54 16</Link>
                </span>
                
                <span>
                    <Link href="mailto:amberstore@gmail.com">amberstore@gmail.com</Link>
                </span>
            </div>
        
        </footer>

    );
};
