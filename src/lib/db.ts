import { sql } from "./neon";

/**
 * Update the user's name in the database. Will throw if larger than 100 or not a string
 * @param userId The userId associated with the user (session.id)
 * @param newName Their new name
 * @returns True if update succeeded, false otherwise
 */
export async function updateUserName(
  userId: string,
  newName: string
): Promise<boolean> {
  if (newName.includes(" ")) return false;

  const safeName =
    typeof newName === "string" ? newName.trim().slice(0, 51) : null;
  if (!safeName) throw new Error("Invalid name");

  const result = await sql`
    UPDATE users
    SET name = ${safeName}, updated_at = now()
    WHERE id = ${userId}
    RETURNING id
  `;

  return result.length > 0;
}
