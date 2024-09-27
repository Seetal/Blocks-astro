import { db } from "../db";
import { topten } from "../db/schema";

export const GET = async ({ request }) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const data = await response.json();
    return new Response(JSON.stringify({message: data}), {
      status: 200,
      headers: { 'content-type': 'application/json'},
    })
}