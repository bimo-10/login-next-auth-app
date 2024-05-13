"use client";

import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignInComponent() {
  const router = useRouter();
  const toast = useToast();
  const handleSignin = async () => {
    const signInData = await signIn("credentials", {
      email: formik.values.email,
      password: formik.values.password,
      redirect: false,
    });

    if (signInData.error) {
      console.log(signInData.error);

      toast({
        title: "Error",
        description: signInData.error,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: "Sign in successful",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      router.push("/");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleSignin,
    validationSchema: yup.object().shape({
      email: yup.string().required().email(),
      password: yup
        .string()
        .required()
        .min(8, "Password must be at least 8 characters"),
    }),
  });

  const handleFormChange = (event) => {
    formik.setFieldValue(event.target.name, event.target.value);
  };

  return (
    <Center height={"100vh"}>
      <Box maxW="md" w={"full"} mx="auto">
        <Card textAlign="center">
          <CardHeader>
            <Heading>Sign In</Heading>
          </CardHeader>
          <CardBody>
            <form action="GET" onSubmit={formik.handleSubmit}>
              <FormControl isInvalid={formik.errors.email}>
                <FormLabel>Email</FormLabel>
                <Input type="email" name="email" onChange={handleFormChange} />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={formik.errors.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  onChange={handleFormChange}
                />
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>
              <Button type="submit" colorScheme="blue" my={4} mx={5} size="md">
                Sign In
              </Button>
            </form>
          </CardBody>
          <Text fontSize="sm" mb={4}>
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-500">
              Sign Up
            </Link>
          </Text>
        </Card>
      </Box>
    </Center>
  );
}
