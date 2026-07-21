import prisma from "@shared/lib/prisma";
import { centsToDollars } from "@shared/lib/money";
import {
  Product,
  ProductUI,
  ProductWithCategory,
  ProductWithCategoryUI,
} from "./types";
import { notFound } from "next/navigation";

function mapProductToUI(product: Product): ProductUI {
  const productUI = {
    ...product,
    priceDollars: centsToDollars(product.price),
  };

  return productUI;
}

function mapProductWithCategoryToUI(
  product: ProductWithCategory,
): ProductWithCategoryUI {
  return {
    ...mapProductToUI(product),
    categorySlug: product.category.slug,
  };
}


export async function getAllProducts(): Promise<
  ProductWithCategoryUI[]
> {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
    });


    return products.map((product) => mapProductWithCategoryToUI(product));

  } catch (error) {
    throw error;
  }
}

export async function getProductsByCategory(
  categoryName: string,
): Promise<ProductWithCategoryUI[] | null> {
  try {
    const category = await prisma.category.findFirst({
      where: {
        name: categoryName,
      },
    });

    if (!category) {
      notFound();
    }

    const products = await prisma.product.findMany({
      where: {
        categoryId: category.id,
      },
      include: {
        category: true,
      },
    });

    if (products.length > 0) {
      return products.map((product) => mapProductWithCategoryToUI(product));
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}

export async function getProduct(productName: string): Promise<ProductUI> {
  try {
    const product = await prisma.product.findFirst({
      where: {
        slug: productName,
      },
    });

    if (!product) {
      notFound();
    }

    return mapProductToUI(product);
  } catch (error) {
    throw error;
  }
}
