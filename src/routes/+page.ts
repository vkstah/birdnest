import type { PageLoad } from "./$types";

export const load = (async ({ fetch }) => {
	const response = await fetch(`/api/drones`);
	return await response.json();
}) satisfies PageLoad;
