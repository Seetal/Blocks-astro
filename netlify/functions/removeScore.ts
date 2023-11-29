import type { Handler } from "@netlify/functions";
import { withPlanetscale } from "@netlify/planetscale";

export const handler: Handler = withPlanetscale(async (event, context) => {
    const {
        planetscale: { connection },
    } = context;

    const { body } = event;

    if (!body) {
        return {
            statusCode: 400,
            body: "Missing body",
        };
    };

    const { id } = JSON.parse(body);
    console.log('AAAAAAAAAAAa', id);
    await connection.execute("DELETE FROM leaderboard Where id=(?)", [id]);

    return {
        statusCode: 201,
    };
});