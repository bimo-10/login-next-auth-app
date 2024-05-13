import {
  Box,
  Container,
  Flex,
  Heading,
  IconButton,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export default function FooterComponent() {
  return (
    <Box as="footer" textAlign={"center"} bg={"gray.200"} py={10}>
      <Container p={10} maxW={"container.lg"}>
        <Heading mb={5}>Foolish Developer</Heading>
        <Text>
          Foolish Developer is a blog website where you will find great tutorial
          on web design and development. Here each tutorial is beautifully
          described step by step with the required source code.
        </Text>
        <Text mt={5} fontSize={"sm"}>
          Copyright © 2024 Foolish Developer. All rights reserved.
        </Text>
      </Container>
    </Box>
  );
}
