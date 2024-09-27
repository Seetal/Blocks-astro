import { db } from "../db";
import { topten } from "../db/schema";

export const GET = async ({ request }) => {
  return new Response(JSON.stringify({message: 'Hello'}), {
    status: 200,
    headers: { 'content-type': 'application/json'},
  })
  // try {
  //   const response = await db.select().from(topten);
  //   return new Response(
  //     JSON.stringify({
  //       ok: true,
  //       data: response
  //     })
  //   )
  // } catch (error) {
  //   return new Response(
  //     JSON.stringify({
  //       ok: false
  //     })
  //   )
  // }
}