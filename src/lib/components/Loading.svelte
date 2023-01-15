<script lang="ts">
  import { onDestroy } from "svelte";

  export let text: string = "Loading";
  let dotsCount = 3;

  const interval = setInterval(() => {
    if (dotsCount === 3) {
      dotsCount = 0;
    }
    dotsCount++;
  }, 1000);

  onDestroy(() => clearInterval(interval));
</script>

<p class="text-sm">{text + ".".repeat(dotsCount)}</p>
