import { db } from "../db";
import { topten } from "../db/schema";

export const GET = async ({ request }) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const data = await response.json();
    // const response = await db.select().from(topten);
    return new Response(
      JSON.stringify({
        ok: true,
        data: data
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