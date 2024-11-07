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

    const id = JSON.parse(body);
    const response = await connection.execute("DELETE FROM topten Where id=(?)", [id]);

    const data = JSON.stringify(response);

    return {
        statusCode: 201,
        body: data
    };
});