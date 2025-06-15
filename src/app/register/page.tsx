"use client";

import { Flex, Button, Separator, Text, Heading, Box } from "@radix-ui/themes";
import Link from "next/link";
import { useState } from "react";

import styles from "../page.module.css";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Handle registration logic here
  }

  return (
    <span className={styles.page}>
      <Link href="../">
        <Button>Home</Button>
      </Link>
      <Box width={{ initial: "60%", lg: "30%", md: "40%" }}>
        <form onSubmit={handleSubmit} autoComplete="on">
          <Flex direction="column" gap="5" align="center">
            <Flex direction="column" align="center" gap="2">
              <Heading size="7" as="h1">
                Register
              </Heading>
              <Text as="p" size="4" color="gray">
                Create your account to start chatting securely
              </Text>
            </Flex>
            <Separator
              orientation="horizontal"
              size="4"
              style={{ width: "100%" }}
            />
            <Flex direction="column" gap="3" width="100%">
              <label
                style={{ width: "100%", textAlign: "left", fontWeight: 500 }}
              >
                Username
                <input
                  type="text"
                  name="username"
                  required
                  value={form.username}
                  onChange={handleChange}
                  autoFocus
                />
              </label>
              <label
                style={{ width: "100%", textAlign: "left", fontWeight: 500 }}
              >
                Email Address
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                />
              </label>
              <label
                style={{ width: "100%", textAlign: "left", fontWeight: 500 }}
              >
                Password
                <input
                  type="password"
                  name="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                />
              </label>
            </Flex>
            <Flex gap="4" justify="center" width="100%">
              <Button
                type="submit"
                variant="solid"
                size="3"
                radius="full"
                style={{ width: "100%" }}
              >
                Register
              </Button>
            </Flex>
            <Text as="p" size="2" color="gray">
              Already have an account?{" "}
              <Link
                href="/signin"
                style={{
                  color: "var(--color-accent)",
                  textDecoration: "underline",
                }}
              >
                Login
              </Link>
            </Text>
          </Flex>
        </form>
      </Box>
    </span>
  );
}
