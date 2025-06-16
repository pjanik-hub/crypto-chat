"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Box, Button, Flex, Text, TextField, Avatar } from "@radix-ui/themes";

export default function UserCard() {
  const { data: session, update } = useSession();
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState(session?.user?.name || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("/api/user/me");

      if (res.ok) {
        const data = await res.json();
        setUsername(data.user.name || "");
      }
    }
    if (session?.user) fetchUser();
    // Keeping this empty, allows this to be fetch upon mounting
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError(null);

    if (username.length > 50) {
      setError("Name must be less than 50 characters");
      setSaving(false);
      return;
    }

    if (username.includes(" ")) {
      setError("Name must not contain spaces");
      setSaving(false);
      return;
    }

    try {
      const res = await fetch("/api/user/update-name", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: username }),
      });
      const data = await res.json();

      if (data.success) {
        setEditing(false);
        // Optionally update session data in the client
        update?.();
      } else {
        setError(data.error || "Failed to update name");
      }
    } catch {
      setError("Failed to update name");
    }
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
          </Flex>
        ) : (
          <Flex gap="4" align="center">
            <Text weight="bold">{username}</Text>
            <Button size="1" variant="ghost" onClick={() => setEditing(true)}>
              Edit
            </Button>
          </Flex>
        )}
        {error && <Text color="red">{error}</Text>}
        <Button variant="outline" onClick={() => signOut()}>
          Logout
        </Button>
      </Flex>
    </Box>
  );
}
