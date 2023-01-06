<script lang="ts">
  import type { Drone } from "src/types";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
  export let drones: Drone[] = [];
  export let timestamp: string = "";

  onMount(() => {
    const ws = new WebSocket(data.webSocketUrl);

    ws.addEventListener("message", (message) => {
      const receivedMessage = JSON.parse(message.data);
      const data = receivedMessage.data;

      drones = data.drones;

      const date = new Date(data.timestamp);
      timestamp = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    });
  });
</script>

<div class="max-w-[400px] px-12 py-6 border border-slate-300 rounded">
  <h2 class="font-semibold">Current drones</h2>
  <span class="transition-colors bg-red-500">Timestamp: {timestamp}</span>
  <div>
    {#each drones as drone}
      <div>{drone.serialNumber}</div>
    {/each}
  </div>
</div>
