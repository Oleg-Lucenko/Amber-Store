import type { Prisma, Product } from '@generated/prisma/client';

export type { Product };

const productWithCategoryArgs = {
  include: {
    category: true,
  },
} satisfies Prisma.ProductDefaultArgs;


export type ProductWithCategory = Prisma.ProductGetPayload<typeof productWithCategoryArgs>;
export type ProductUI = Omit<Product, 'price'> & {
    priceDollars: number;  
};
export type ProductWithCategoryUI = ProductUI & {
    categorySlug: ProductWithCategory['category']['slug'];
};

export type ProductCardProps = Pick<ProductUI, 'name' | 'imgPath' | 'priceDollars' | 'description'>;
export type ProductListItemProps = Pick<ProductWithCategoryUI, 'name' | 'imgPath' | 'slug' | 'priceDollars' | 'categorySlug'>;

