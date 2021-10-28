import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Box, Text, Flex, Image, Button } from "@chakra-ui/react";

import { IState } from "../../store";
import { ICartItem } from "../../store/modules/cart/types";

import CloseIcon from '../../assets/closeIcon.svg';

interface CartProps {
  handleCloseCart: () => void;
}

function Cart({ handleCloseCart }: CartProps) {
  const [total, setTotal] = useState(0);

  const cart = useSelector<IState, ICartItem[]>(state => state.cart.items);

  useEffect(() => {
    setTotal(cart.reduce((accumulator, item) => {
      const subtotal = item.product.price * item.quantity;

      return accumulator + subtotal;
    }, 0));
  }, [cart]);

  return (
    <Box w="300px" bg="gray.100" position="absolute" top="80px" right="24px" boxShadow="2xl">
      <Flex align="center" justify="space-between" padding={3} bg="gray.800" borderTopRadius="base">
        <Text fontSize="1.5rem" fontWeight="600" color="gray.100">Carrinho</Text>
        <Button onClick={handleCloseCart} variant="ghost" colorScheme="gray.100" size="sm">
          <Image src={CloseIcon} alt="Fechar" />
        </Button>
      </Flex>
      {cart.map(item => {
        return (
          <Flex key={item.product.id} px={2} py={4} justify="space-between" align="center" borderBottom="1px" borderColor="gray.400">
            <Flex direction="column">
              <Text fontWeight="600" lineHeight="0.875">{item.product.title}</Text>
              <Text fontSize="0.75rem" color="gray.600">Qtd {item.quantity}</Text>
            </Flex>

            <Text>R$ {(item.product.price * item.quantity).toFixed(2)}</Text>
          </Flex>
        )
      })}
      <Box padding={2} bg="green.400" borderBottomRadius="base">
        <Text fontSize="1.25rem" color="gray.100">Total: R$ {total.toFixed(2)}</Text>
      </Box>
    </Box>


    // <table>
    //   <thead>
    //     <tr>
    //       <th>Produto</th>
    //       <th>Preço</th>
    //       <th>Quantidade</th>
    //       <th>Subtotal</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {cart.map(item => (
    //       <tr key={item.product.id}>
    //         <td>{item.product.title}</td>
    //         <td>{item.product.price}</td>
    //         <td>{item.quantity}</td>
    //         <td>{(item.product.price * item.quantity).toFixed(2)}</td>
    //       </tr>
    //     ))}
    //   </tbody>
    // </table>
  );
}

export default Cart;