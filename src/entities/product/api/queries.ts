import prisma from "@shared/lib/prisma";
import { centsToDollars } from "@shared/lib/money";
import {
  ProductUI,
  ProductWithCategory,
  CategoryWithProducts,
  PriceSort
} from "../model/types";
import { notFound } from "next/navigation";



function mapProductToUI(
  product: ProductWithCategory,
): ProductUI {

  const productUI = {    
    ...product,
    priceDollars: centsToDollars(product.price),
    categorySlug: product.category.slug,
  }

  return productUI;
};

export async function getAllProducts(
  sort?: PriceSort
): Promise<ProductUI[]> {
    const products = await prisma.product.findMany({
      orderBy: sort ?
        {price: sort} : undefined,
      include: {
        category: true,
      },
    });

  const mappedProducts = products.map((product) =>
    mapProductToUI(product),
  );

  return mappedProducts;
}

export async function getCategoryWithProducts(
  categorySlug: string,
  sort?: PriceSort,
): Promise<CategoryWithProducts | null> {
  const category = await prisma.category.findUnique({
    where: {
      slug: categorySlug,
    },
  });

  if (!category) {
    return null;
  }

  const products = await prisma.product.findMany({
    where: {
      categoryId: category.id,
    },
    orderBy: sort ? { price: sort } : undefined,
    include: {
      category: true,
    },
  });

  return {
    category,
    products: products.map((product) => mapProductToUI(product)),
  };
}

export async function getProduct(
  categorySlug: string,
  productSlug: string,
): Promise<ProductUI> {
  const product = await prisma.product.findFirst({
    where: {
      slug: productSlug,
      category: {
        slug: categorySlug,
      },
    },
    include: {
        category: true,
    },
  });

  if (!product) {
    notFound();
  }

  return mapProductToUI(product);
}
