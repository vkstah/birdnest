<script lang="ts">
  import { invalidate } from "$app/navigation";
  import type { Drone } from "src/types";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
  export let drones: Drone[] = data.droneData.drones;

  onMount(async () => {
    async function getDrones() {
      invalidate("app:server");
      drones = data.droneData.drones;
    }

    const interval = setInterval(getDrones, 5000);
    getDrones();

    return () => clearInterval(interval);
  });
</script>

<div class="grid grid-cols-2">
  <div>
    <h2>Total current drones: {drones.length}</h2>
    <table class="text-left">
      <thead>
        <tr>
          <th>Serial number</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          {#each drones as drone}
            <tr class="odd:bg-gray-100">
              <td>{drone.serialNumber}</td>
            </tr>
          {/each}
        </tr>
      </tbody>
    </table>
  </div>
  <div>
    <h2>Violators: {data.violators.length}</h2>
    <table class="text-left">
      <thead>
        <tr>
          <th>Serial number</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          {#each data.violators as violator}
            <tr class="odd:bg-gray-100">
              <td>{violator.serialNumber}</td>
            </tr>
          {/each}
        </tr>
      </tbody>
    </table>
  </div>
</div>
