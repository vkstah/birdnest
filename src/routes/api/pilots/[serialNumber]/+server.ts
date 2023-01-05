import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET = (async ({ params }) => {
	const { serialNumber } = params;

	const response = await fetch(`https://assignments.reaktor.com/birdnest/pilots/${serialNumber}`);
	const responseJson = await response.json();

	return json(responseJson);
}) satisfies RequestHandler;
