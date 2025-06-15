"use client";

import styles from "./page.module.css";
import { Button, Flex, Separator, Text } from "@radix-ui/themes";
import Link from "next/link";
// import Footer from "../components/Footer";

export default function Home() {
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
            <Link href="/register">
              <Button variant="solid">Register</Button>
            </Link>
            <Link href="/signin">
              <Button variant="outline">Login</Button>
            </Link>
          </Flex>
        </Flex>
      </main>
    </div>
  );
}
