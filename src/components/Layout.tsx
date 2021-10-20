import { ReactNode } from "react";
import { Flex } from "@chakra-ui/react";

type Props = {
  children?: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      w="100%"
      h="100vh"
      bg="gray.800"
      backgroundImage="url('/financial-art-back.jpg')"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
    >
      {children}
    </Flex>
  );
}
