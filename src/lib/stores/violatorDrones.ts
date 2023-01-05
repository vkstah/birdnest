import type { Drone } from "src/types";
import { writable } from "svelte/store";

export const violatorDrones = writable<Drone[]>([]);
