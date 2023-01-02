<script lang="ts">
	import { invalidate } from "$app/navigation";
	import type { Drone } from "src/types";
	import { onMount } from "svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
	export let drones: Drone[] = data.drones;
	export let violatorDrones: Drone[] = data.drones.filter((drone: Drone) => {
		const positionX = drone.positionX;
		const positionY = drone.positionY;
		const distanceSquared = Math.pow(positionX - 250000, 2) + Math.pow(positionY - 250000, 2);
		const radiusSquared = Math.pow(100000, 2);

		if (distanceSquared < radiusSquared) return true;
	});

	onMount(async () => {
		async function getDrones() {
			invalidate("/api/drones");
		}

		const interval = setInterval(getDrones, 5000);
		getDrones();

		return () => clearInterval(interval);
	});
</script>

<div class="grid">
	<div>Total drones: {drones.length}</div>
	<div>Violators: {violatorDrones.length}</div>
	{#each drones as drone}
		<div>{drone.serialNumber}</div>
	{/each}
</div>
