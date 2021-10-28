import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex, Button, Text } from "@chakra-ui/react";

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
    <Flex p={4} justify="space-between" align="center" bg="gray.100" borderRadius="base" border="1px" borderColor="gray.400" boxShadow="md">
      <Text fontSize="1em" fontWeight="600">{product.title}</Text>
      <Text fontSize="1em">R$ {product.price}</Text>

      {hasFailedStockCheck
        ? <Text fontSize="1em" color="red.400">Sem estoque</Text>
        : <Button
          size="sm"
          colorScheme="purple"
          onClick={() => handleAddProductToCart(product)}
        >
          Comprar
        </Button>
      }
    </Flex>
  );
}

export default CatalogItem;