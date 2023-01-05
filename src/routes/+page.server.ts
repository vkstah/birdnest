import { supabase } from "$lib/supabase";
import { parseXML } from "$lib/utils/parseXML";
import { error } from "@sveltejs/kit";
import type { Drone } from "src/types";
import type { PageServerLoad } from "./$types";
import { filterViolatorDrones } from "../lib/utils/filterViolatorDrones";

export const load = (async ({ fetch, depends }) => {
  depends("app:server");
  const dronesAPIResponse = await fetch("https://assignments.reaktor.com/birdnest/drones");
  const xml = await dronesAPIResponse.text();

  if (!xml || dronesAPIResponse.status !== 200) {
    throw error(500, "Failed to fetch drone data.");
  }

  const parsedDroneData = parseXML({ xml });
  const dronesTimestamp: string = parsedDroneData.report.capture["@_snapshotTimestamp"];
  const dronesArray: Drone[] = parsedDroneData.report.capture.drone.map((drone: Drone) => {
    return drone;
  });

  const violatorDrones = filterViolatorDrones(dronesArray);

  const { data: violatorFetchData, error: violatorFetchError } = await supabase
    .from("violators")
    .select();

  let newViolatorDrones: Drone[] = [];

  if (!violatorFetchData) {
    newViolatorDrones = violatorDrones;
  } else {
    newViolatorDrones = violatorDrones.filter((violatorDrone) => {
      return !violatorFetchData.find(
        (violator) => violator.serialNumber === violatorDrone.serialNumber
      );
    });
  }

  const { data: violatorInsertData, error: violatorInsertError } = await supabase
    .from("violators")
    .insert(
      newViolatorDrones.map((violatorDrone) => {
        return {
          serialNumber: violatorDrone.serialNumber,
          positionX: violatorDrone.positionX,
          positionY: violatorDrone.positionY,
          timestamp: dronesTimestamp
        };
      })
    )
    .select();

  return {
    droneData: {
      timestamp: dronesTimestamp,
      drones: dronesArray
    },
    violators: violatorFetchData ? violatorFetchData : []
  };
}) satisfies PageServerLoad;
