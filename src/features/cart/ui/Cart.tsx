"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "../model/CartContext";
import { formatDollars } from "@shared/lib/money";
import Image from "next/image";
import Link from "next/link";
import CartIcon from "@images/Cart.svg";
import styles from "./cart.module.scss";



export function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { items, itemCount, subtotal, setItemQuantity, removeItem, clearCart } =
    useCart();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const triggerElement = triggerRef.current;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      triggerElement?.focus();
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen(true)}
        aria-label={`Open cart, ${itemCount} items`}
      >
        <CartIcon className={styles.cartIcon} aria-hidden="true" />
        <span>Cart</span>
        {itemCount > 0 && (
          <span className={styles.count} aria-hidden="true">
            {itemCount > 99 ? "99+" : itemCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className={styles.backdrop} onMouseDown={() => setIsOpen(false)}>
          <aside
            className={styles.drawer}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header className={styles.drawerHeader}>
              <div>
                <h2 id="cart-title">Your cart</h2>
                <p>
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                className={styles.closeButton}
                onClick={() => setIsOpen(false)}
                aria-label="Close cart"
                title="Close cart" 
              >
                ×
              </button>
            </header>

            {items.length === 0 ? (
              <div className={styles.emptyState}>
                <span className={styles.emptyIcon} aria-hidden="true" />
                <h3>Your cart is empty</h3>
                <p>Add a product and it will appear here.</p>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className={styles.continueButton}
                >
                  Continue shopping
                </button>
              </div>
            ) : (
              <>
                <ul className={styles.items}>
                  {items.map((item) => (
                    <li key={item.id} className={styles.item}>
                      <Link
                        href={`/${item.categorySlug}/${item.slug}`}
                        onClick={() => setIsOpen(false)}
                        className={styles.itemImageLink}
                      >
                        <Image
                          src={item.imgPath}
                          width={80}
                          height={80}
                          alt={item.name}
                          className={styles.itemImage}
                        />
                      </Link>

                      <div className={styles.itemContent}>
                        <Link
                          href={`/${item.categorySlug}/${item.slug}`}
                          onClick={() => setIsOpen(false)}
                          className={styles.itemName}
                        >
                          {item.name}
                        </Link>
                        <span className={styles.unitPrice}>
                          {formatDollars(item.priceDollars)}
                        </span>

                        <div className={styles.itemControls}>
                          <div
                            className={styles.quantity}
                            aria-label={`Quantity for ${item.name}`}
                          >
                            <button
                              type="button"
                              onClick={() =>
                                setItemQuantity(item.id, item.quantity - 1)
                              }
                              aria-label={`Decrease quantity of ${item.name}`}
                              title="Decrease quantity"
                            >
                              −
                            </button>
                            <span aria-live="polite">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() =>
                                setItemQuantity(item.id, item.quantity + 1)
                              }
                              aria-label={`Increase quantity of ${item.name}`}
                              title="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          <button
                            type="button"
                            className={styles.removeButton}
                            onClick={() => removeItem(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      <strong className={styles.lineTotal}>
                        {formatDollars(
                          item.priceDollars * item.quantity,
                        )}
                      </strong>
                    </li>
                  ))}
                </ul>

                <footer className={styles.summary}>
                  <div className={styles.summaryRow}>
                    <span>Subtotal</span>
                    <strong>{formatDollars(subtotal)}</strong>
                  </div>
                  <p>Shipping is calculated at checkout.</p>
                  <button
                    type="button"
                    className={styles.continueButton}
                    onClick={() => setIsOpen(false)}
                  >
                    Continue shopping
                  </button>
                  <button
                    type="button"
                    className={styles.clearButton}
                    onClick={clearCart}
                  >
                    Clear cart
                  </button>
                </footer>
              </>
            )}
          </aside>
        </div>
      )}
    </>
  );
}
