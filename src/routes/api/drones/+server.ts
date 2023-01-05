import { json, error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { XMLParser } from "fast-xml-parser";
import type { Drone } from "src/types";

export const GET = (async ({ url }) => {
  const response = await fetch("https://assignments.reaktor.com/birdnest/drones");
  const xmlStr = await response.text();

  if (!xmlStr || response.status !== 200) {
    throw error(500, "Failed to fetch drone data.");
  }

  const parserOptions = {
    ignoreAttributes: false
  };
  const parser = new XMLParser(parserOptions);
  const parsedData = parser.parse(xmlStr);

  const snapshotTimestamp = parsedData.report.capture["@_snapshotTimestamp"];
  const drones = parsedData.report.capture.drone.map((drone: Drone) => {
    return drone;
  });

  return json({
    snapshotTimestamp,
    drones
  });
}) satisfies RequestHandler;
