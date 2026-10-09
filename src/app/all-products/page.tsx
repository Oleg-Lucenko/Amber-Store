import { ProductsList } from "@widgets/products-list/ProductsList";
import { getAllProducts } from "@entities/product/api/queries";
import { NoProducts, validateProductsQuery } from "@entities/product";
import { notFound } from "next/navigation";



type SearchParams = Promise<Record<string, string | string[] | undefined>>;


export default async function AllProductsPage({searchParams}: {searchParams: SearchParams}) {

  const searchParamsData = await searchParams;
  const sort = validateProductsQuery(searchParamsData);

    if (sort === null) {
      notFound();
    };
  
      const products = await getAllProducts(sort);
  
    
      if (products.length === 0) {
      return <NoProducts />;
      }

  
      return <ProductsList listName={'All products'} products={products} sort={sort} />;
  
  
};
    
