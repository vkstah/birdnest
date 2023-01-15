<script lang="ts">
  import ContentBox from "$lib/components/ContentBox.svelte";
  import Loading from "$lib/components/Loading.svelte";
  import { formatTime, isDroneViolating, sortViolatorsByDate } from "$lib/utils";
  import type { DronesSnaphot, Violator } from "src/types";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
  export let dronesSnapshot: DronesSnaphot = {
    timestamp: "",
    error: "",
    drones: []
  };
  export let violators: Violator[] = data.violators;
  export let isLoadingWebSocketConnection: boolean;

  onMount(() => {
    const connect = () => {
      isLoadingWebSocketConnection = true;
      const ws = new WebSocket(`wss://${data.serverUrl}`);

      ws.addEventListener("open", (event) => {
        isLoadingWebSocketConnection = false;
        console.log("WebSocket connected to the server!");
      });

      ws.addEventListener("message", (event) => {
        const receivedMessage = JSON.parse(event.data);
        const webSocketData = receivedMessage.data;
        dronesSnapshot = webSocketData.dronesSnapshot;
        violators = sortViolatorsByDate(webSocketData.violators);
      });

      ws.addEventListener("close", (event) => {
        console.log("WebSocket closed. Attempting to reconnect in 1 second...");
        setTimeout(() => {
          connect();
        }, 1000);
      });

      ws.addEventListener("error", (event) => {
        console.log("Something went wrong with the WebSocket. Closing WebSocket...");
        ws.close();
      });
    };
    connect();
  });
</script>

<div class="container mx-auto px-2 py-6 lg:pt-24 lg:pb-36">
  <div class="grid grid-cols-8 gap-6 lg:gap-12">
    <div class="col-span-8 max-w-[750px] relative">
      <ContentBox>
        <h2 class="text-slate-900 font-semibold text-2xl">Drones 🤖</h2>
        <p class="mt-2 text-sm leading-relaxed max-w-[600px]">
          This is the list of currently visible drones. Drones currently inside the forbiddean area
          are highlighted.
        </p>
        <p class="absolute top-6 right-6 text-xs">
          Latest update: <span class="font-medium">
            {formatTime(new Date(dronesSnapshot.timestamp))}
          </span>
        </p>
        <div class="overflow-x-scroll lg:overflow-x-auto mt-8 w-full">
          {#if dronesSnapshot.error}
            <p class="text-sm">{dronesSnapshot.error}</p>
          {:else if isLoadingWebSocketConnection}
            <Loading text="Establishing a connection" />
          {:else if dronesSnapshot.timestamp === "" && dronesSnapshot.drones.length === 0}
            <Loading text="Waiting for data from the server" />
          {:else}
            <table class="text-left">
              <thead>
                <tr>
                  {#each ["SERIAL NUMBER", "X-POS", "Y-POS"] as tableHeading}
                    <th class="px-4 py-2 text-sm">{tableHeading}</th>
                  {/each}
                </tr>
              </thead>
              <tbody>
                {#each dronesSnapshot.drones as drone}
                  <tr class={isDroneViolating(drone) ? "bg-red-200" : ""}>
                    <td class="px-4 py-2 text-sm">{drone.serialNumber}</td>
                    <td class="px-4 py-2 text-sm">{drone.positionX}</td>
                    <td class="px-4 py-2 text-sm">{drone.positionY}</td>
                  </tr>
                {/each}
              </tbody>
            </table>
          {/if}
        </div>
      </ContentBox>
    </div>
    <div class="col-span-8">
      <ContentBox>
        <h2 class="font-semibold text-xl">Violators 🚫</h2>
        <p class="mt-2 text-sm leading-relaxed max-w-[600px]">
          This is the list of drones and their pilots that did not respect the zone. The closest
          position is displayed for each violator.
        </p>
        <div class="mt-8 overflow-x-scroll w-full lg:overflow-x-auto">
          <table class="text-left">
            <thead>
              <tr>
                {#each ["LAST SEEN", "SERIAL NUMBER", "X-POS", "Y-POS", "NAME", "EMAIL", "PHONE NUMBER"] as tableHeading}
                  <th class="px-4 py-2 text-sm">{tableHeading}</th>
                {/each}
              </tr>
            </thead>
            <tbody>
              {#each violators as violator}
                <tr class="hover:bg-blue-100">
                  <td class="px-4 py-2 text-sm font-medium"
                    >{formatTime(new Date(violator.timestamp))}</td
                  >
                  <td class="px-4 py-2 text-sm">{violator.serialNumber}</td>
                  <td class="px-4 py-2 text-sm">{violator.positionX}</td>
                  <td class="px-4 py-2 text-sm">{violator.positionY}</td>
                  <td class="px-4 py-2 text-sm">{`${violator.firstName} ${violator.lastName}`}</td>
                  <td class="px-4 py-2 text-sm">{violator.email}</td>
                  <td class="px-4 py-2 text-sm">{violator.phoneNumber}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </ContentBox>
    </div>
  </div>
</div>
