import type { Drone } from "src/types";
import { writable } from "svelte/store";

export const drones = writable<Drone[]>([]);

const fetchDrones = async () => {
	return {};
};
