/* eslint-disable */
import theme from "./theme";
import Layout from "./components/Layout";
import { ChakraProvider, Box, Stack, VStack } from "@chakra-ui/react";
import Uniswap from "./components/Uniswap";
import "@fontsource/inter";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Stack spacing={4}>
          <Box backgroundImage="url('/logo.png')" backgroundPosition="center" backgroundRepeat="no-repeat" w="550px" h="100px" p={4} color="white" />
          <Uniswap />
        </Stack>
      </Layout>
    </ChakraProvider>
  );
}

export default App;
