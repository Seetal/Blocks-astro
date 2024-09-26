export const prerender = false;

import { APIRoute } from "astro";
import { db } from "../../db";
import { leaderboard } from "../../db/schema";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  try {
    const response = await db.insert(leaderboard).values(data);
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