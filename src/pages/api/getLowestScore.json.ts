import { APIRoute } from "astro";
import { db } from "../../db";
import { topten } from "../../db/schema";
import { min } from "drizzle-orm";

export const GET: APIRoute = async ({ request }) => {
  try {
    const response = await db.select({
      score: min(topten.score),
      id: topten.id
    }).from(topten);
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