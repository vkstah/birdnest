import type { PageServerLoad } from "./$types";
import { PUBLIC_WEBSOCKET_URL } from "$env/static/public";

export const load = (async ({ fetch }) => {
  return {
    webSocketUrl: PUBLIC_WEBSOCKET_URL
  };
}) satisfies PageServerLoad;
