import type { Drone } from "src/types";

/**
 * Filters an array of Drones using a math equation to determine which ones are inside the forbidden area i.e. which drones are violators.
 * @param drones Array of drones to be filtered.
 * @returns Array of drones that are inside the forbidden area.
 */
export const filterViolatorDrones = (drones: Drone[]) => {
	return drones.filter((drone: Drone) => {
		const positionX = drone.positionX;
		const positionY = drone.positionY;
		const distanceSquared = Math.pow(positionX - 250000, 2) + Math.pow(positionY - 250000, 2);
		const radiusSquared = Math.pow(100000, 2);

		if (distanceSquared < radiusSquared) return true;
	});
};
