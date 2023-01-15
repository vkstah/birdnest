import type { Drone } from "src/types";

/**
 * Determines whether or not a single Drone is violating the area.
 * @param drone Drone object.
 * @returns True if is violating, false otherwise.
 */
export const isDroneViolating = (drone: Drone) => {
  const positionX = drone.positionX;
  const positionY = drone.positionY;
  const distanceSquared = Math.pow(positionX - 250000, 2) + Math.pow(positionY - 250000, 2);
  const radiusSquared = Math.pow(100000, 2);

  if (distanceSquared < radiusSquared) {
    return true;
  } else {
    return false;
  }
};

/**
 * Adds a leading zero. Useful for displaying time. For example: 9:15 vs. 09:15.
 * @param num The number.
 * @returns The number as string including the zero (if applicable)
 */
const leadingZero = (num: number) => `0${num}`.slice(-2);

/**
 * Formats a date object into a time string HH:MM:SS
 * @param date Date object.
 * @returns Time string.
 */
export const formatTime = (date: Date): string =>
  [date.getHours(), date.getMinutes(), date.getSeconds()].map(leadingZero).join(":");
