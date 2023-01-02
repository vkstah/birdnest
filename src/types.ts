export type Point = {
	x: number;
	y: number;
};

export type Drone = {
	serialNumber: string;
	model: string;
	manufacturer: string;
	mac: string;
	ipv4: string;
	ipv6: string;
	firmware: string;
	positionY: number;
	positionX: number;
	altitude: number;
};
