"use client";

import { Flex, Button, Box, Text } from "@radix-ui/themes";
import Link from "next/link";
import { signIn } from "next-auth/react";
import styles from "../page.module.css";

export default function SignIn() {
  return (
    <span className={styles.page}>
      <Link href="../">
        <Button>Home</Button>
      </Link>
      <Box width={{ initial: "60%", lg: "30%", md: "40%" }}>
        <Flex direction="column" gap="2" align="center">
          <Text as="p">Sign-in Providers:</Text>
          <Button
            type="button"
            variant="outline"
            onClick={() => signIn("google")}
            style={{ width: "100%" }}
          >
            Sign in with Google
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => signIn("github")}
            style={{ width: "100%" }}
          >
            Sign in with GitHub
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => signIn("osu")}
            style={{ width: "100%" }}
          >
            Sign in with Osu!
          </Button>
        </Flex>
      </Box>
    </span>
  );
}
