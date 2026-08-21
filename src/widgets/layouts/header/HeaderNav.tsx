"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Category } from "@entities/category/types";
import styles from "./header.module.scss";

export function HeaderNav({ categories }: { categories: Category[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigationRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (target instanceof Node && !navigationRef.current?.contains(target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1001px)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setIsOpen(false);
    };

    desktopQuery.addEventListener("change", closeOnDesktop);
    return () => desktopQuery.removeEventListener("change", closeOnDesktop);
  }, []);

  const links = (
    <>
      <li>
        <Link
          href="/all-products"
          className={styles.navLink}
          onClick={() => setIsOpen(false)}
        >
          All products
        </Link>
      </li>

      {categories.map((category) => (
        <li key={category.id}>
          <Link
            href={`/${category.slug}`}
            className={styles.navLink}
            onClick={() => setIsOpen(false)}
          >
            {category.name}
          </Link>
        </li>
      ))}
    </>
  );

  return (
    <nav
      ref={navigationRef}
      className={styles.navigation}
      aria-label="Categories navigation"
    >
      <ul className={styles.navList}>{links}</ul>

      <button
        ref={buttonRef}
        type="button"
        className={`${styles.menuButton} ${isOpen ? styles.menuButtonOpen : ""}`}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="header-navigation-menu"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
      >
        <span className={styles.menuIcon} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      {isOpen && (
        <ul id="header-navigation-menu" className={styles.mobileMenu}>
          {links}
        </ul>
      )}
    </nav>
  );
}
