import { useEffect, useState } from "react";
import { Box, Flex, Stack, Image, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";

import api from "../../services/api";
import { IProduct, ICartItem } from "../../store/modules/cart/types";
import { IState } from "../../store";

import CatalogItem from "../CatalogItem";

import ReduxLogo from '../../assets/reduxLogo.svg';
import CartIcon from '../../assets/cartIcon.svg';

interface CatalogProps {
  handleOpenCart: () => void;
}

function Catalog({ handleOpenCart }: CatalogProps) {
  const [catalog, setCatalog] = useState<IProduct[]>([]);
  const [totalItems, setTotalItems] = useState(0);

  const cart = useSelector<IState, ICartItem[]>(state => state.cart.items);

  useEffect(() => {
    setTotalItems(cart.reduce((accumulator, item) => {
      const subtotal = item.quantity;

      return accumulator + subtotal;
    }, 0));
  }, [cart]);

  useEffect(() => {
    api.get('products').then(response => {
      setCatalog(response.data as IProduct[]);
    })
  }, []);

  return (
    <Box p={6}>
      <Flex align="center" justify="space-between">
        <Flex align="center">
          <Image h={12} src={ReduxLogo} alt="Logo" />
          <Text fontSize="2.5em" fontWeight="700" ml={4}>Catálogo</Text>
        </Flex >

        <button onClick={totalItems === 0 ? () => { } : handleOpenCart}>
          <Flex align="flex-end">
            <Flex direction="column" align="flex-end" mr={3}>
              <Text fontWeight="600" lineHeight="0.75rem" color="gray.700">Carrinho</Text>
              <Text fontSize="0.75rem" color="gray.500">{totalItems} produtos</Text>
            </Flex>
            <Image h={9} src={CartIcon} alt="Carrinhho" />
          </Flex>
        </button>
      </Flex>

      <Stack mt={8} direction="column" spacing={4}>
        {catalog.map(product => (
          <CatalogItem
            product={product}
            key={product.id}
          />
        ))}
      </Stack>
    </Box>
  );
}

export default Catalog;