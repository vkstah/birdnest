import type { Pilot } from "src/types";
import { writable } from "svelte/store";

export const pilots = writable<Pilot[]>([]);
