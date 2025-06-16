import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { updateUserName } from "@/lib/db";

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { name } = await req.json();

  const trimmed = typeof name === "string" ? name.trim() : "";

  if (!trimmed) {
    return NextResponse.json(
      { success: false, error: "Username cannot be empty" },
      { status: 400 }
    );
  }

  if (trimmed.length > 50) {
    return NextResponse.json(
      { success: false, error: "Username length must be less than 50" },
      { status: 400 }
    );
  }

  if (/\s/.test(trimmed)) {
    return NextResponse.json(
      { success: false, error: "Username cannot contain spaces" },
      { status: 400 }
    );
  }

  try {
    const ok = await updateUserName(session.user.id, trimmed);
    return NextResponse.json({ success: ok });
  } catch (e) {
    return NextResponse.json(
      { success: false, error: (e as Error).message },
      { status: 400 }
    );
  }
}
