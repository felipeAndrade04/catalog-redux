import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { IProduct } from "../../store/modules/cart/types";
import { addProductToCart } from "../../store/modules/cart/actions";

interface CatalogItemProps {
  product: IProduct
}

function CatalogItem({ product }: CatalogItemProps) {
  const dispatch = useDispatch();

  const handleAddProductToCart = useCallback((product: IProduct) => {
    dispatch(addProductToCart(product));
  }, [dispatch]);

  return (
    <article>
      <strong>{product.title}</strong> {" - "}
      <span>{product.price}</span> {"  "}

      <button
        type="button"
        onClick={() => handleAddProductToCart(product)}
      >
        Comprar
      </button>
    </article>
  );
}

export default CatalogItem;