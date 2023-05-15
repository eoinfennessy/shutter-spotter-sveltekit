<script lang="ts">
	import Chart from "svelte-frappe-charts";

	export let data;

	console.log(data);

	const categories = Object.keys(data.locationCountByCategory);
	const counts = categories.map((category) => data.locationCountByCategory[category]);
	let chartType = "bar";

	let chartData = {
		labels: categories,
		datasets: [
			{
				name: "Count of Locations",
				values: counts,
			},
		],
	};
  
  // let otherChartData = {
	// 	labels: ["Foo", "Bar"],
	// 	datasets: [
	// 		{
	// 			name: "Placeholder",
	// 			values: [3, 7]
	// 		},
	// 	],
	// };
</script>

<div class="box">
	<h1 class="title">ShutterSpotter Analytics</h1>
	<div class="tile is-ancestor">
		<div class="tile is-3 is-vertical is-parent">
			<div class="tile is-child box notification is-primary has-text-weight-bold has-text-centered">
				<p class="is-size-1">{data.userCount}</p>
				<p class="is-size-5">Total Count of Users</p>
			</div>
			<div class="tile is-child box notification is-info has-text-weight-bold has-text-centered">
				<p class="is-size-1">{data.locationCount}</p>
				<p class="is-size-5">Total Count of Locations</p>
			</div>
			<div class="tile is-child box notification is-warning has-text-weight-bold has-text-centered">
				<p class="is-size-1">{data.photoCount}</p>
				<p class="is-size-5">Total Count of Photos</p>
			</div>
			<div class="tile is-child box notification is-success has-text-weight-bold has-text-centered">
				<p class="is-size-1">{+data.avgLocationsPerUser.toFixed(2)}</p>
				<p class="is-size-5">Average Locations per User</p>
			</div>
			<div class="tile is-child box notification is-danger has-text-weight-bold has-text-centered">
				<p class="is-size-1">{+data.avgPhotosPerUser.toFixed(2)}</p>
				<p class="is-size-5">Average Photos per User</p>
			</div>
			<div class="tile is-child box notification is-link has-text-weight-bold has-text-centered">
				<p class="is-size-1">{+data.avgPhotosPerLocation.toFixed(2)}</p>
				<p class="is-size-5">Average Photos per Location</p>
			</div>
		</div>
		<div class="tile is-parent is-vertical">
			<div class="tile is-child box">
				<p class="title has-text-centered">Location Count by Category</p>
				{#key chartType}
					<Chart data={chartData} type={chartType} colors={["#00d1b2"]} />
				{/key}
				<fieldset class="control">
					<legend>Select Chart Type:</legend>
					<label class="radio" for="bar">
						<input bind:group={chartType} type="radio" id="bar" name="bar" value="bar" checked />
						Bar
					</label>
					<label class="radio" for="pie">
						<input bind:group={chartType} type="radio" id="pie" name="pie" value="pie" />
						Pie
					</label>
					<label class="radio" for="donut">
						<input bind:group={chartType} type="radio" id="donut" name="donut" value="donut" />
						Donut
					</label>
				</fieldset>
			</div>
			<!-- <div class="tile is-child box">
				<p class="title has-text-centered">Another Chart</p>
				<Chart data={otherChartData} type="line" colors={["#00d1b2"]} />
			</div> -->
		</div>
	</div>
</div>

<!-- <script>
  data = {
    labels: [
      {{#each locationCountByCategory}}
        "{{@key}}",
      {{/each}}
    ],
    datasets: [
      { values: [
          {{#each locationCountByCategory}}
            {{this}},
          {{/each}}
        ]
      }
    ]
  }
  const chart = new frappe.Chart( "#chart", {
    data: data,
    type: 'bar',
    height: 540,
    colors: ['#00d1b2'],
    valuesOverPoints: true,
    axisOptions: {
      xAxisMode: 'tick'
    },
  });
</script> -->
