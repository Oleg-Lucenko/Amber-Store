import type { PriceSort } from "./types";

export function validateProductsQuery(query: Record<string, string | string[] | undefined>): PriceSort | undefined | null {

    const queryObjKeys = Object.keys(query);



    if (queryObjKeys.length === 0) {
        return undefined;
    } else if (queryObjKeys.length !== 1 ||  queryObjKeys[0] !== 'sort') {
        return null;
    } else if (query.sort === 'asc' || query.sort === 'desc') {
        return query.sort;
    };

    return null;
    

};
