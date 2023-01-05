import type { Drone } from "src/types";

export const filterExpiredViolators = (violators: any) => {
	return violators.filter((violator: any) => {
		const violatorDate = new Date(violator.timestamp);
		const now = new Date();

		return;
	});
};
