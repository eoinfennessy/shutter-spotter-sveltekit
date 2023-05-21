<script lang="ts">
	import AnalyticsTiles from "$src/lib/AnalyticsTiles.svelte";
	import Heatmap from "$src/lib/Heatmap.svelte";
	import TimeBucketChart from "$src/lib/TimeBucketChart.svelte";
	import TypeSelectChart from "$src/lib/TypeSelectChart.svelte";

	export let data;

	const categories = Object.keys(data.locationCountByCategory);
	const categoryCounts = categories.map((category) => data.locationCountByCategory[category]);

	const locationCategoryChartData = {
		labels: categories,
		datasets: [
			{
				name: "Count of Locations",
				values: categoryCounts,
			},
		],
	};

	const tileData = [
		{ title: "Total Count of Users", value: data.userCount, class: "is-primary" },
		{ title: "Total Count of Locations", value: data.locationCount, class: "is-info" },
		{ title: "Total Count of Photos", value: data.photoCount, class: "is-warning" },
		{
			title: "Average Locations per User",
			value: +data.avgLocationsPerUser.toFixed(2),
			class: "is-success",
		},
		{
			title: "Average Photos per User",
			value: +data.avgPhotosPerUser.toFixed(2),
			class: "is-danger",
		},
		{
			title: "Average Photos per Location",
			value: +data.avgPhotosPerLocation.toFixed(2),
			class: "is-link",
		},
	];
</script>

<h1 class="title">ShutterSpotter Analytics</h1>
<hr />

<div class="columns">
	<div class="column is-2">
		<AnalyticsTiles {tileData} />
	</div>

	<div class="column">
		<div class="box">
			<h2 class="title has-text-centered">Location Count by Category</h2>
			<TypeSelectChart chartData={locationCategoryChartData} />
		</div>

		<div class="box">
			<h2 class="title has-text-centered">User Signup Heatmap</h2>
			<Heatmap times={data.userCreationTimes} />
		</div>

		<div class="box">
			<h2 class="title has-text-centered">User Signup Trends & Projections</h2>
			<TimeBucketChart
				times={data.userCreationTimes}
				bucketCount={7}
				showTrend={true}
				bucketLabel={"Signups"}
			/>
		</div>
	</div>
</div>

<style>
	.graph-svg-tip, .graph-svg-tip > .svg-pointer{
        background: #fff;
    }
    .graph-svg-tip > .title, .graph-svg-tip > .title > strong {
        color: #000;
    }
</style>
