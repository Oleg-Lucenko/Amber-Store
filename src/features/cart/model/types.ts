export interface CartProductData {
  id: number;
  name: string;
  imgPath: string;
  priceDollars: number;
  slug: string;
  categorySlug: string;
}

export interface CartItem extends CartProductData {
  quantity: number;
}
