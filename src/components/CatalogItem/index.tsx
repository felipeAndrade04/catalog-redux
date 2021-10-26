import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IProduct } from "../../store/modules/cart/types";
import { addProductToCartRequest } from "../../store/modules/cart/actions";
import { IState } from "../../store";

interface CatalogItemProps {
  product: IProduct
}

function CatalogItem({ product }: CatalogItemProps) {
  const dispatch = useDispatch();

  const hasFailedStockCheck = useSelector<IState, boolean>(state => {
    return state.cart.failedStockCheck.includes(product.id);
  })

  const handleAddProductToCart = useCallback((product: IProduct) => {
    dispatch(addProductToCartRequest(product));
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

      {hasFailedStockCheck && <span style={{ color: 'red' }}>Falta de estoque</span>}
    </article>
  );
}

export default CatalogItem;