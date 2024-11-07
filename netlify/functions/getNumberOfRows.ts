import type { Handler } from "@netlify/functions";
import { withPlanetscale } from "@netlify/planetscale";

export const handler: Handler = withPlanetscale(async (event, context) => {
    const {
        planetscale: { connection },
    } = context;

    const response = await connection.execute("SELECT COUNT(*) as number_of_rows FROM leaderboard");
    const data = JSON.stringify(response.rows);

    return {
        statusCode: 201,
        body: data
    };
});