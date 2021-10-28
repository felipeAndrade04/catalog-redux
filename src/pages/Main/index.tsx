import { useState } from "react";
import { Box } from "@chakra-ui/react";

import Catalog from "../../components/Catalog";
import Cart from "../../components/Cart";

function Main() {
  const [showCart, setShowCart] = useState(false);

  return (
    <Box h="100vh" bg="gray.300">
      <Catalog handleOpenCart={() => setShowCart(true)} />
      {showCart && <Cart handleCloseCart={() => setShowCart(false)} />}
    </Box>
  );
}

export default Main;