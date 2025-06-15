"use client";

import { Flex, Button, Separator, Text, Heading, Box } from "@radix-ui/themes";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "../page.module.css";

export default function SignIn() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const res = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (res?.ok && !res.error) {
        router.push("/");
      } else if (res?.error === "CredentialsSignin") {
        setError("Invalid email or password");
      } else {
        setError("An unknown error occurred");
      }
    } catch {
      setError("An error occurred during sign in");
    }
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
                Login
              </Heading>
              <Text as="p" size="4" color="gray">
                Enter your credentials to access your account
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
                Email Address
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  autoFocus
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
              {error && (
                <Text as="p" color="red" size="2" style={{ marginTop: 0 }}>
                  {error}
                </Text>
              )}
            </Flex>
            <Flex gap="4" justify="center" width="100%">
              <Button
                type="submit"
                variant="solid"
                size="3"
                radius="full"
                style={{ width: "100%" }}
              >
                Login
              </Button>
            </Flex>
            <Text as="p" size="2" color="gray">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                style={{
                  color: "var(--color-accent)",
                  textDecoration: "underline",
                }}
              >
                Register
              </Link>
            </Text>
          </Flex>
        </form>
      </Box>
    </span>
  );
}
