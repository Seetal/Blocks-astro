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

    const { name, score, date } = JSON.parse(body);
    
    const response = await connection.execute("INSERT INTO leaderboard (name, score, date) VALUES (?, ?, ?)", [
        name,
        score,
        date,
    ]);
    const data = JSON.stringify(response);
    //console.log('AAAAAA', response);
    return {
        statusCode: 201,
        body: data
    };
});