import { IProduct } from "./types";

export function addProductToCart(product: IProduct) {
  return {
    type: '@cart/ADD_PRODUCT_TO_CART',
    payload: {
      product,
    }
  }
}