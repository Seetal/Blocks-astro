import { db } from "../src/db";
import { topten } from "../src/db/schema";

export const onRequest = async () => {
  const response = await db.select().from(topten);
  return new Response(
    JSON.stringify({
      ok: true,
      data: response
    })
  )
}