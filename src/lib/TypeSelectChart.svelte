<script lang="ts">
  import Chart from "svelte-frappe-charts"

  export let chartData: any;
  export let chartTypes = ["bar", "pie", "percentage", "donut"];
  export let options = { colors: ["#00d1b2"] };
  let type = chartTypes[0];
</script>

{#key type}
	<Chart data={chartData} {type} {...options} />
{/key}
<fieldset class="control">
	<legend>Select Chart Type:</legend>
  {#each chartTypes as chartType}
    <label class="radio" for={chartType}>
      <input bind:group={type} type="radio" id={chartType} name={chartType} value={chartType} />
      {chartType}
    </label>
  {/each}
</fieldset>
