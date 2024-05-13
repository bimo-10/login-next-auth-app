"use client";
import { Box, Button, Container, Heading, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

export default function Main() {
  const [text, setText] = useState("curhat");

  useEffect(() => {
    const texts = ["curhat", "belajar", "karya", "bermain"];
    let index = 0;

    const intervalId = setInterval(() => {
      index = (index + 1) % texts.length; // ganti indeks secara berurutan dan kembali ke 0 setelah mencapai akhir array
      setText(texts[index]);
    }, 2000); // ganti teks setiap 2 detik

    return () => clearInterval(intervalId); // Bersihkan interval saat komponen di-unmount
  }, []);

  return (
    <Box
      as="main"
      bg="cyan.200"
      minH={"100vh"}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box as="section" p={16}>
        <Container
          maxW="container.sm"
          bg="gray.200"
          p={16}
          borderRadius="md"
          textAlign={"center"}
        >
          <Heading as={"h1"} size={"2xl"} mb={4}>
            Platform untuk{" "}
            <Heading as={"span"} size={"2xl"} color={"purple.500"}>
              {text}
            </Heading>
          </Heading>
          <Text size={"lg"}>
            Temukan teman untuk{" "}
            <span className="text-purple-500 text-xl">{text}</span>, atau buat
            kelompok untuk berkarya.
          </Text>
          <Box display={"flex"} justifyContent={"center"} gap={14} mt={14}>
            <Button variant={"outline"} colorScheme={"purple"}>
              Temukan Teman
            </Button>
            <Button colorScheme={"purple"}>Buat Kelompok</Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
