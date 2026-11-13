import prisma from "@shared/lib/prisma";
import { centsToDollars, dollarsToCents } from "@shared/lib/money";
import { pageSize, skip } from "@entities/product/model/pagination";
import {
  ProductUI,
  ProductWithCategory,
  CategoryWithProducts,
  PriceSort,
  ProductsUIData,
  CatalogQuery,
} from "../model/types";
import { notFound } from "next/navigation";

function mapProductToUI(product: ProductWithCategory): ProductUI {
  const productUI = {
    ...product,
    priceDollars: centsToDollars(product.price),
    categorySlug: product.category.slug,
  };

  return productUI;
}

function buildPriceFilter({ minPrice, maxPrice }: CatalogQuery) {
  return {
    gte: minPrice === undefined ? undefined : dollarsToCents(minPrice),
    lte: maxPrice === undefined ? undefined : dollarsToCents(maxPrice),
  };
}

async function isProductScopeEmpty(
  filteredProductsCount: number,
  categoryId?: number,
): Promise<boolean> {
  if (filteredProductsCount > 0) {
    return false;
  }

  const product = await prisma.product.findFirst({
    where: categoryId === undefined ? {} : { categoryId },
    select: { id: true },
  });

  return product === null;
}

// Product queries:

export async function getAllProducts(
  catalogQuery: CatalogQuery,
): Promise<ProductsUIData> {
  const where = {
    price: buildPriceFilter(catalogQuery),
  };

  const [products, filteredProductsCount] = await Promise.all([
    prisma.product.findMany({
      take: pageSize,
      skip: skip(catalogQuery.page),
      orderBy: catalogQuery.sort ? { price: catalogQuery.sort } : undefined,
      where,
      include: {
        category: true,
      },
    }),

    prisma.product.count({ where }),
  ]);

  const isCatalogEmpty = await isProductScopeEmpty(filteredProductsCount);

  const mappedProducts = products.map((product) => mapProductToUI(product));
  const totalPages = Math.ceil(filteredProductsCount / pageSize);

  return {
    products: mappedProducts,
    totalPages: totalPages,
    isCatalogEmpty,
  };
}

export async function getCategoryWithProducts(
  categorySlug: string,
  catalogQuery: CatalogQuery,
): Promise<CategoryWithProducts | null> {
  const category = await prisma.category.findUnique({
    where: {
      slug: categorySlug,
    },
  });

  if (!category) {
    return null;
  }
  const where = {
    categoryId: category.id,
    price: buildPriceFilter(catalogQuery),
  };

  const [products, filteredProductsCount] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy: catalogQuery.sort ? { price: catalogQuery.sort } : undefined,
      include: {
        category: true,
      },
    }),

    prisma.product.count({ where }),
  ]);

  const isCatalogEmpty = await isProductScopeEmpty(
    filteredProductsCount,
    category.id,
  );

  return {
    category,
    products: products.map((product) => mapProductToUI(product)),
    isCatalogEmpty,
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
