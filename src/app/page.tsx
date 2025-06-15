"use client";

import styles from "./page.module.css";
import { Button, Flex, Separator, Text } from "@radix-ui/themes";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
// import Footer from "../components/Footer";

export default function Home() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Flex direction="column" gap="4">
          <Flex direction="column">
            <h1>Enchat</h1>
            <Text as="p">An encrypted chat web application</Text>
          </Flex>
          <Separator orientation="horizontal" size="4" />
          <Flex gap="4" justify="center">
            {session?.user ? (
              <Flex gap="2" align="center">
                <Text as="span">
                  Welcome, {session.user.name || session.user.email}!
                </Text>
                <Button variant="outline" onClick={() => signOut()}>
                  Logout
                </Button>
              </Flex>
            ) : (
              <Link href="/signin">
                <Button variant="outline">Login</Button>
              </Link>
            )}
          </Flex>
        </Flex>
      </main>
    </div>
  );
}
