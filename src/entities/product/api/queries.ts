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

export async function getAllProducts(
  catalogQuery: CatalogQuery,
): Promise<ProductsUIData> {
  const where = {
    price: {
      gte:
        catalogQuery.minPrice === undefined
          ? undefined
          : dollarsToCents(catalogQuery.minPrice),
      lte:
        catalogQuery.maxPrice === undefined
          ? undefined
          : dollarsToCents(catalogQuery.maxPrice),
    },
  };

  const [products, totalProducts] = await Promise.all([
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

  const mappedProducts = products.map((product) => mapProductToUI(product));
  const totalPages = Math.ceil(totalProducts / pageSize);

  return {
    products: mappedProducts,
    totalPages: totalPages
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

  const products = await prisma.product.findMany({
    where: {
      categoryId: category.id,
      price: {
        gte:
          catalogQuery.minPrice === undefined
            ? undefined
            : dollarsToCents(catalogQuery.minPrice),
        lte:
          catalogQuery.maxPrice === undefined
            ? undefined
            : dollarsToCents(catalogQuery.maxPrice),
      },
    },
    orderBy: catalogQuery.sort ? { price: catalogQuery.sort } : undefined,
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
