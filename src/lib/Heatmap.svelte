<script lang="ts">
  import Chart from "svelte-frappe-charts";

  export let times: string[] = [];
	export let range: "month" | "year" = "year";
	export let options = {};

	const dateCounts = times
		.map((time) => Math.floor(new Date(new Date(time).toDateString()).valueOf() / 1000))
		.reduce((dates, currentDate) => {
			dates[currentDate] = dates[currentDate] ? dates[currentDate] + 1 : 1;
			return dates;
		}, Object.create(null) as Record<number, number>);

	const now = new Date();
	const nowCopy = new Date(now.valueOf());

	let startDate: Date;
	switch (range) {
		case "year":
			startDate = new Date(nowCopy.setFullYear(now.getFullYear() - 1));
			break;
		case "month":
			startDate =new Date(nowCopy.setDate(1))
			break;
	}
	let heatmapData = {
		dataPoints: dateCounts,
		start: startDate,
		end: now,
	};
</script>

<Chart data={heatmapData} type="heatmap" {...options} />
