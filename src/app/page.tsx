"use client";

import styles from "./page.module.css";
import { Button, Card, Flex, Separator, Text } from "@radix-ui/themes";
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
          <Separator orientation="horizontal" size="4" />
          {/* Service Cards */}
          <Flex gap="4" justify="center" wrap="wrap" mt="6">
            <Card style={{ minWidth: 220, maxWidth: 300 }}>
              <Text as="p" weight="bold" size="5" mb="2">
                End-to-End Encryption
              </Text>
              <Text as="p" size="3">
                All messages are encrypted on your device and can only be read
                by the intended recipient.
              </Text>
            </Card>
            <Card style={{ minWidth: 220, maxWidth: 300 }}>
              <Text as="p" weight="bold" size="5" mb="2">
                Secure Transmission
              </Text>
              <Text as="p" size="3">
                Data is transmitted securely using industry-standard protocols
                to protect your privacy.
              </Text>
            </Card>
            <Card style={{ minWidth: 220, maxWidth: 300 }}>
              <Text as="p" weight="bold" size="5" mb="2">
                User Profiles
              </Text>
              <Text as="p" size="3">
                Manage your identity and personalize your experience with
                customizable user profiles.
              </Text>
            </Card>
            <Card style={{ minWidth: 220, maxWidth: 300 }}>
              <Text as="p" weight="bold" size="5" mb="2">
                Multiple Login Providers
              </Text>
              <Text as="p" size="3">
                Support for multiple OAuth providers, foregoing traditional
                login.
              </Text>
            </Card>
          </Flex>
        </Flex>
      </main>
    </div>
  );
}
