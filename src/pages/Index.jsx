import React, { useState } from "react";
import { ChakraProvider, Box, VStack, Heading, Input, Button, FormControl, FormLabel, useToast, Container } from "@chakra-ui/react";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const toast = useToast();

  const handleSignup = async () => {
    try {
      const response = await fetch("https://backengine-9amv.fly.dev/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 204) {
        toast({
          title: "Account created.",
          description: "You've successfully signed up!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setEmail("");
        setPassword("");
      } else {
        throw new Error("An error occurred during signup.");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("https://backengine-9amv.fly.dev/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.status === 200 && data.accessToken) {
        toast({
          title: "Logged in.",
          description: "You've successfully logged in!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setIsLoggedIn(true);
      } else {
        throw new Error("Invalid email or password.");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <ChakraProvider>
      <Container centerContent>
        <Box p={4}>
          <VStack spacing={4} align="stretch">
            {isLoggedIn ? (
              <Heading>Welcome back!</Heading>
            ) : (
              <>
                <Heading>Sign Up</Heading>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
                </FormControl>
                <Button leftIcon={<FaUserPlus />} colorScheme="teal" onClick={handleSignup}>
                  Sign Up
                </Button>
                <Heading>Login</Heading>
                <Button leftIcon={<FaSignInAlt />} colorScheme="blue" onClick={handleLogin}>
                  Login
                </Button>
              </>
            )}
          </VStack>
        </Box>
      </Container>
    </ChakraProvider>
  );
};

export default Index;
