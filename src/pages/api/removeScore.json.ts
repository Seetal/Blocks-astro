import { APIRoute } from "astro";
import { db } from "../../db";
import { topten } from "../../db/schema";
import { eq } from "drizzle-orm";

export const DELETE: APIRoute = async ({ request }) => {
  const id = await request.json();
  try {
    const response = await db.delete(topten).where(eq(topten.id, id));
  } catch (error) {
    return new Response(JSON.stringify({
        ok: false
      })
    )
  }
  return new Response(JSON.stringify({
      ok: true
    })
  )
}