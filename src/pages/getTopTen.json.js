import { db } from "../db";
import { topten } from "../db/schema";

export const GET = async ({ request }) => {
  try {
    const response = await db.select().from(topten);
    return new Response(
      JSON.stringify({
        ok: true,
        data: response
      })
    )
  } catch (error) {
    return new Response(
      JSON.stringify({
        ok: false
      })
    )
  }
}