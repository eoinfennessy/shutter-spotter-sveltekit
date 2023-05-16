<script lang="ts">
	import Chart from "svelte-frappe-charts";

	type BucketSize = "hour" | "day" | "month";

	export let times: string[] = [];
	export let bucketCount = 7;
	export let bucketSize: BucketSize = "day";
	export let bucketLabel = "Values";
	export let lastTimestamp: number = new Date().valueOf();
	export let showTrend = true;
	export let showProjection = false;
	export let projectionRange = 2;

	function getBucketFromTimestamp(timestamp: number, bucketSize: BucketSize) {
		const date = new Date(timestamp);
		switch (bucketSize) {
			case "hour":
				return date.setMinutes(0, 0, 0);
			case "day":
				return date.setHours(0, 0, 0, 0);
			case "month":
				return new Date(date.setMonth(date.getMonth(), 1)).setHours(0, 0, 0, 0);
		}
	}

	function convertBucketSizeToMilliseconds(bucketSize: BucketSize) {
		switch (bucketSize) {
			case "hour":
				return 3600000;
			case "day":
				return 86400000;
			case "month":
				return 2628000000;
		}
	}

	function createBuckets(bucketSizeMs: number, lastBucket: number, bucketCount: number) {
		const buckets: number[] = [];
		for (let i = bucketCount - 1; i >= 0; i--) {
			buckets.push(lastBucket - bucketSizeMs * i);
		}
		return buckets;
	}

	function createLinearRegressionModel(xValues: number[], yValues: number[]) {
		if (xValues.length !== yValues.length) throw new Error("Length of arrays are not equal");
		const xMean = xValues.reduce((a, x) => a + x, 0) / xValues.length;
		const yMean = yValues.reduce((a, y) => a + y, 0) / yValues.length;

		let num = 0;
		let denom = 0;
		for (let i = 0; i < xValues.length; i++) {
			num += (xValues[i] - xMean) * (yValues[i] - yMean);
			denom += (xValues[i] - xMean) * (xValues[i] - xMean);
		}
		const slope = num / denom;
		const yIntercept = yMean - slope * xMean;
		return { slope, yIntercept };
	}

	function getY(x: number, slope: number, yIntercept: number, constrainAboveZero = true) {
		const y = slope * x + yIntercept;
		return y < 0 && constrainAboveZero ? 0 : y;
	}

	function getChartData(
		times: string[],
		lastTimestamp: number,
		bucketSize: BucketSize,
		bucketCount: number,
		bucketLabel: string
	) {
		let lastBucketMs = getBucketFromTimestamp(lastTimestamp, bucketSize);
		let buckets = createBuckets(
			convertBucketSizeToMilliseconds(bucketSize),
			lastBucketMs,
			bucketCount
		);
		const counts: Record<number, number> = {};
		buckets.forEach((bucket) => (counts[bucket] = 0));
		const timestamps = times.map((time) => new Date(time).valueOf());
		timestamps.forEach((timestamp) => (counts[getBucketFromTimestamp(timestamp, bucketSize)] += 1));
		const timestampCounts = buckets.map((bucket) => counts[bucket]);

		return {
			buckets: buckets,
			labels: [""],
			datasets: [
				{
					name: bucketLabel,
					values: timestampCounts,
					chartType: "bar",
				},
			],
		};
	}

	function getTrend(xValues: number[], yValues: number[]) {
		const { slope, yIntercept } = createLinearRegressionModel(xValues, yValues);
		const regressionData = xValues.map((x, i) => {
			const y = getY(x, slope, yIntercept);
			return y;
		});
		return {
			regressionModel: { slope, yIntercept },
			chartData: {
				name: "Trend Line",
				values: regressionData,
				chartType: "line",
			},
		};
	}

	function getProjection(
		projectionRange: number,
		bucketSizeMs: number,
		lastBucket: number,
		slope: number,
		yIntercept: number
	) {
		const projectionBuckets = [];
		for (let i = 1; i <= projectionRange; i++) {
			projectionBuckets.push(lastBucket + bucketSizeMs * i);
		}
		const projections = projectionBuckets.map((label) => getY(label, slope, yIntercept));
		return { projectionBuckets, projections };
	}

	function getRefreshedChartData() {
		const chartData = getChartData(times, lastTimestamp, bucketSize, bucketCount, bucketLabel);

		if (showTrend) {
			const trend = getTrend(chartData.buckets, chartData.datasets[0].values);
			chartData.datasets.push(trend.chartData);

			if (showProjection) {
				const lastBucket = new Date(chartData.buckets[chartData.buckets.length - 1]).valueOf();
				const bucketSizeMs = convertBucketSizeToMilliseconds(bucketSize);

				const { projectionBuckets, projections } = getProjection(
					projectionRange,
					bucketSizeMs,
					lastBucket,
					trend.regressionModel.slope,
					trend.regressionModel.yIntercept
				);
				chartData.buckets.push(...projectionBuckets);
				chartData.datasets[1].values.push(...projections);
			}
		}

		if (bucketSize === "hour") {
			chartData.labels = chartData.buckets.map((bucket) => new Date(bucket).toLocaleTimeString());
		} else {
			chartData.labels = chartData.buckets.map((bucket) => new Date(bucket).toDateString());
		}

		return chartData;
	}

	let chartData = getRefreshedChartData();
	const refreshChartData = () => (chartData = getRefreshedChartData());
</script>

{#key chartData}
	<Chart
		data={chartData}
		type="axis-mixed"
		lineOptions={{ hideDots: 1 }}
		axisOptions={{ xIsSeries: false }}
	/>
{/key}

<div class="columns">
	<div class="column">
		<div class="block">
			<label for="chart-range">Chart Range:</label>
			<input
				bind:value={bucketCount}
				on:change={refreshChartData}
				type="number"
				name="chart-range"
				id="chart-range"
			/>
			<select
				bind:value={bucketSize}
				on:change={refreshChartData}
				name="label-size"
				id="label-size"
			>
				<option value="hour">Hours</option>
				<option value="day">Days</option>
				<option value="month">Months</option>
			</select>
		</div>

		<div class="block">
			<label class="checkbox" for="show-trend">
				<input
					bind:checked={showTrend}
					on:change={refreshChartData}
					type="checkbox"
					name="show-trend"
					id="show-trend"
				/>
				Show Trend Line
			</label>
		</div>
	</div>

	<div class="column">
		<div class="block">
			<label class="checkbox block" for="show-projection">
				<input
					bind:checked={showProjection}
					on:change={refreshChartData}
					type="checkbox"
					name="show-projection"
					id="show-projection"
					disabled={!showTrend}
				/>
				Show Projection
			</label>
		</div>

		<div class="block">
			<label for="projection-range"
				>Projection Range:
				<input
					bind:value={projectionRange}
					on:change={refreshChartData}
					type="number"
					name="projection-range"
					id="projection-range"
					disabled={!(showTrend && showProjection)}
				/>
				{bucketSize}s
			</label>
		</div>
	</div>
</div>
