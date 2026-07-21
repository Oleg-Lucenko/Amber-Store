import prisma from '@shared/lib/prisma';
import type { Category } from './types';



export async function getCategories(): Promise<Category[] | []> {
    try {
      const result = await prisma.category.findMany();
      return result;
    } catch (error) {
      console.error('Failed to fetch categories', error);
      return [];
    };
};

export async function getCategory(id: number): Promise<Category | null> {
    try {
      const result = await prisma.category.findUnique({
        where: {
          id: id
        }
      });
      return result;
    } catch (error) {
      throw error;
    };
};
