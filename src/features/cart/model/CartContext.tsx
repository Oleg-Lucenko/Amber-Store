"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem, CartProductData } from "./types";

const CART_STORAGE_KEY = "amber-store-cart";
const EMPTY_CART: CartItem[] = [];

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (product: CartProductData) => void;
  setItemQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== "object") {
    return false;
  }

  const item = value as Record<string, unknown>;

  return (
    typeof item.id === "number" &&
    typeof item.name === "string" &&
    typeof item.imgPath === "string" &&
    typeof item.priceDollars === "number" &&
    typeof item.slug === "string" &&
    typeof item.categorySlug === "string" &&
    typeof item.quantity === "number" &&
    Number.isInteger(item.quantity) &&
    item.quantity > 0
  );
}

function readStoredCart(): CartItem[] {
  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);

    if (!storedCart) {
      return [];
    }

    const parsedCart: unknown = JSON.parse(storedCart);
    return Array.isArray(parsedCart) ? parsedCart.filter(isCartItem) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [storedItems, setItems] = useState<CartItem[] | null>(null);
  const items = storedItems ?? EMPTY_CART;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(readStoredCart());
  }, []);

  useEffect(() => {
    if (storedItems !== null) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(storedItems));
    }
  }, [storedItems]);

  const addItem = useCallback((product: CartProductData) => {
    setItems((currentItems) => {
      const items = currentItems ?? EMPTY_CART;
      const existingItem = items.find((item) => item.id === product.id);

      if (existingItem) {
        return items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...items, { ...product, quantity: 1 }];
    });
  }, []);

  const setItemQuantity = useCallback((id: number, quantity: number) => {
    setItems((currentItems) => {
      const items = currentItems ?? EMPTY_CART;

      if (quantity < 1) {
        return items.filter((item) => item.id !== id);
      }

      return items.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      );
    });
  }, []);

  const removeItem = useCallback((id: number) => {
    setItems((currentItems) =>
      (currentItems ?? EMPTY_CART).filter((item) => item.id !== id),
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems(() => []);
  }, []);

  const value = useMemo(
    () => ({
      items,
      itemCount: items.reduce((total, item) => total + item.quantity, 0),
      subtotal: items.reduce(
        (total, item) => total + item.priceDollars * item.quantity,
        0,
      ),
      addItem,
      setItemQuantity,
      removeItem,
      clearCart,
    }),
    [addItem, clearCart, items, removeItem, setItemQuantity],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const cart = useContext(CartContext);

  if (!cart) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return cart;
}
