<script lang="ts">
	import type { Location } from "$src/services/shutter-spotter-types";
	import CurrentWeather from "./CurrentWeather.svelte";
	import LeafletMap from "./LeafletMap.svelte";

	export let location: Location;
</script>

<div class="columns">
	<div class="column is-one-third">
		<div class="box" style="height: 100%;">
			<h1 class="title">
				{location.name}
			</h1>
			<span class="tag is-primary block">
				{location.category}
			</span>
			<p class="block">
				{location.description}
			</p>
		</div>
	</div>

	<div class="column is-one-third">
		<CurrentWeather weather={location.currentWeather} />
	</div>

	<div class="column is-one-third">
		<LeafletMap
			id="hero-map"
			style="height: 100%; min-height: 20vh;"
			showZoomControl={true}
			showLayerControl={true}
			markers={[
				{
					coordinates: {
						lat: location.latitude,
						lng: location.longitude,
					},
					popupText: location.name,
					layerTitle: location.name,
				},
			]}
		/>
	</div>
</div>
