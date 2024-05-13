"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Center,
  FormErrorMessage,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as yup from "yup";

export default function SignUpComponent() {
  const router = useRouter();

  const handleSignup = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formik.values.username,
          email: formik.values.email,
          password: formik.values.password,
        }),
      });

      const data = await response.json();

      // Anda bisa menambahkan logika lebih lanjut di sini, misalnya:
      // - Menangani respons dari server
      // - Redirect pengguna ke halaman lain
      // - Menampilkan pesan kesalahan atau konfirmasi
      console.log(data);

      if (response.ok) {
        router.push("/signin");
      }
    } catch (error) {
      console.log(error);
      // Menangani error yang mungkin terjadi selama proses fetch
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: handleSignup,
    validationSchema: yup.object().shape({
      username: yup
        .string()
        .required()
        .min(3, "Username must be at least 3 characters")
        .max(10, "Username must be less than 10 characters"),
      email: yup.string().required().email("Invalid email address"),
      password: yup
        .string()
        .required()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        ),
      confirmPassword: yup
        .string()
        .required("Please confirm your password")
        .oneOf([yup.ref("password"), null], "Passwords must match"),
    }),
  });

  const handleFormChange = (event) => {
    formik.setFieldValue(event.target.name, event.target.value);
  };

  return (
    <Center height="100vh">
      <Box maxW="md" w="full" mx="auto">
        <Card textAlign="center">
          <CardHeader>
            <Heading>Sign Up</Heading>
          </CardHeader>
          <CardBody>
            <form onSubmit={formik.handleSubmit}>
              {/* form control for username */}
              <FormControl isInvalid={formik.errors.username}>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  name="username"
                  onChange={handleFormChange}
                />
                <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
              </FormControl>

              {/* form control for email */}
              <FormControl isInvalid={formik.errors.email}>
                <FormLabel>Email</FormLabel>
                <Input type="email" name="email" onChange={handleFormChange} />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>

              {/* form control for password */}
              <FormControl isInvalid={formik.errors.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  onChange={handleFormChange}
                />
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>

              {/* form control for confirm password */}
              <FormControl isInvalid={formik.errors.confirmPassword}>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  name="confirmPassword"
                  onChange={handleFormChange}
                />
                <FormErrorMessage>
                  {formik.errors.confirmPassword}
                </FormErrorMessage>
              </FormControl>
              <Button
                type="submit"
                colorScheme="blue"
                my={4}
                mx={"auto"}
                size="md"
                width={"full"}
              >
                Sign Up
              </Button>
            </form>
          </CardBody>
          <Text fontSize="sm" mb={4}>
            Already have an account?{" "}
            <Link href="/signin" className="text-blue-500">
              Sign In
            </Link>
          </Text>
        </Card>
      </Box>
    </Center>
  );
}
