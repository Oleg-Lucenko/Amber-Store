"use client";

import { useCart } from "../model/CartContext";
import type { CartProductData } from "../model/types";
import styles from "./cart.module.scss";

export function AddToCartButton({
  product
}: {
  product: CartProductData;
}) {
  const { addItem, items } = useCart();
  const quantity = items.find((item) => item.id === product.id)?.quantity ?? 0;

  return (
    <button
      type="button"
      className={styles.addButton}
      onClick={() => addItem(product)}
    >
      {quantity > 0 ? `In cart: ${quantity}` : "Add to cart"}
    </button>
  );
}
