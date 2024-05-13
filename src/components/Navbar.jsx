"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Navbar({ session }) {
  const pathname = usePathname();
  return (
    <>
      <Flex
        as="nav"
        bg="gray.200"
        p={4}
        justify="space-between"
        alignItems={"center"}
      >
        <Box>
          <Heading as="h1" fontSize="2xl">
            Logo
          </Heading>
        </Box>
        {/* <Spacer /> */}
        <Box display={"flex"} gap={4}>
          <Button
            variant="ghost"
            isActive={pathname === "/"}
            _active={{ color: "purple.500" }}
          >
            <Link href="/">Home</Link>
          </Button>

          {session?.user ? (
            <Button
              variant="ghost"
              _active={{ color: "purple.500" }}
              onClick={() =>
                signOut({
                  callbackUrl: `${window.location.origin}/signin`,
                })
              }
            >
              Sign Out
            </Button>
          ) : (
            <>
              <Button
                variant="ghost"
                isActive={pathname === "/signin"}
                _active={{ color: "purple.500" }}
              >
                <Link href="/signin">Sign In</Link>
              </Button>
              <Button
                variant="ghost"
                isActive={pathname === "/signup"}
                _active={{ color: "purple.500" }}
              >
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </Box>
      </Flex>
    </>
  );
}
