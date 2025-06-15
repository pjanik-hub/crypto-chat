"use client";

import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { Box, Button, Flex, Text, TextField, Avatar } from "@radix-ui/themes";

export default function UserCard() {
  const { data: session } = useSession();
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState(session?.user?.name || "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    // TODO: Send PATCH/PUT request to your API to update username in DB
    setEditing(false);
    setSaving(false);
  };

  if (!session?.user) return null;

  return (
    <Box
      p="4"
      style={{ border: "1px solid #eee", borderRadius: 8, minWidth: 260 }}
    >
      <Flex direction="column" align="center" gap="4">
        <Avatar
          src={session.user.image || undefined}
          fallback={session.user.name?.[0] || "?"}
          size="3"
        />
        {editing ? (
          <Flex gap="2" align="baseline">
            <TextField.Root
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={saving}
            />
            <Button size="1" onClick={handleSave} disabled={saving}>
              Save
            </Button>
            <Button
              size="1"
              variant="ghost"
              onClick={() => setEditing(false)}
              disabled={saving}
            >
              Cancel
            </Button>
          </Flex>
        ) : (
          <Flex gap="4" align="center">
            <Text weight="bold">{username}</Text>
            <Button size="1" variant="ghost" onClick={() => setEditing(true)}>
              Edit
            </Button>
          </Flex>
        )}
        <Button variant="outline" onClick={() => signOut()}>
          Logout
        </Button>
      </Flex>
    </Box>
  );
}
