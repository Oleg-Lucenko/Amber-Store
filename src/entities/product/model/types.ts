import type { ReactNode } from "react";
import type { Category, Prisma, Product } from "@generated/prisma/client";

export type { Product };

const productWithCategoryArgs = {
  include: {
    category: true,
  },
} satisfies Prisma.ProductDefaultArgs;

export type ProductWithCategory = Prisma.ProductGetPayload<typeof productWithCategoryArgs>;

export type ProductUI = Omit<Product, 'price'> & {
  priceDollars: number; 
  categorySlug: ProductWithCategory["category"]["slug"];
};


export type CategoryWithProducts = {
  category: Category,
  products: ProductUI[]
};

export type ProductCardProps = Pick<
  ProductUI,
  "name" | "imgPath" | "priceDollars" | "description"
> & {
  actions?: ReactNode;
};

export type ProductListProps = {
  listName: string,
  products: ProductUI[],
  sort?: 'asc' | 'desc'
};

export type ProductListItemProps = Pick<
  ProductUI,
  "name" | "imgPath" | "slug" | "priceDollars" | "categorySlug"
> & {
  actions?: ReactNode;
};

export type PriceSort = "asc" | "desc";


