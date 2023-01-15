import type { PageServerLoad } from "./$types";
import { PUBLIC_SERVER_URL } from "$env/static/public";
import { sortViolatorsByDate } from "$lib/utils";

export const load = (async ({ fetch }) => {
  const dronesSnapshotResponse = await fetch(`https://${PUBLIC_SERVER_URL}/drones`);
  const violatorsResponse = await fetch(`https://${PUBLIC_SERVER_URL}/violators`);
  const dronesSnapshotJSON = await dronesSnapshotResponse.json();
  const violatorsJSON = await violatorsResponse.json();
  const dronesSnapshot = dronesSnapshotJSON.data;
  const violators = sortViolatorsByDate(violatorsJSON.data);

  return {
    dronesSnapshot,
    violators,
    serverUrl: PUBLIC_SERVER_URL
  };
}) satisfies PageServerLoad;
