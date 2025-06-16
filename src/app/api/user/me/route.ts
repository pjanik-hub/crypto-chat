import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { sql } from "@/lib/neon";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await sql`
    SELECT id, name FROM users WHERE id = ${session.user.id}
  `;
  const user = result[0];
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json({ user });
}
