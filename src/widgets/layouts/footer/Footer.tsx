import type { Category } from "@entities/category/types";
import Image from "next/image";
import Link from "next/link";
import styles from "./footer.module.scss";

export default async function Footer({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <footer className={styles.footer}>
      <div className={styles.amberAbout}>
        <Link href="/" aria-label="Amber home">
          <Image
            src="/img/logo2.png"
            height={120}
            width={140}
            className={styles.logo2}
            alt="Amber"
          />
        </Link>
        <p>
          Amber is an independent electronics store focused on reliable
          everyday tech, fair prices, and straightforward service.
        </p>
      </div>

      <nav aria-label="Product categories" className={styles.categories}>
        <h3>Products</h3>
        <ul>
          <li>
            <Link href="/all-products">All products</Link>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <Link href={`/${category.slug}`}>{category.name}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <nav aria-label="Store pages" className={styles.pages}>
        <h3>Store pages</h3>
        <ul>
          <li>
            <Link href="#">About us</Link>
          </li>
          <li>
            <Link href="#">FAQs</Link>
          </li>
          <li>
            <Link href="#">Delivery information</Link>
          </li>
        </ul>
      </nav>

      <section className={styles.contacts}>
        <h3>Get in touch</h3>
        <ul>
          <li>
            <Link href="tel:0333-700-54-16">0333 700 54 16</Link>
          </li>
          <li>
            <Link href="mailto:amberstore@gmail.com">
              amberstore@gmail.com
            </Link>
          </li>
        </ul>
      </section>
    </footer>
  );
}
