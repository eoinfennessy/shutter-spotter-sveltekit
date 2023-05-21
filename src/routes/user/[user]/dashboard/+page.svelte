<script lang="ts">
	import { onDestroy } from "svelte";
	import LocationList from "$lib/LocationList.svelte";
	import LocationForm from "$lib/LocationForm.svelte";
	import LeafletMap from "$lib/LeafletMap.svelte";
	import UserWelcome from "$lib/UserWelcome.svelte";
	import { PUBLIC_OPEN_WEATHER_MAP_APP_ID } from "$env/static/public";
	import { latestLocation, latestMapMarker } from "$src/stores";
	import { createMapMarker, createOpenWeatherMapOverlay } from "$src/utils/map-utils.js";
	import type { OpenWeatherMapType } from "$src/utils/map-utils.js";

	export let data;

	const openWeatherMapOverlayTypes: OpenWeatherMapType[] = [
		"Clouds",
		"Precipitation",
		"Pressure",
		"Wind",
		"Temperature",
	];
	const overlays = openWeatherMapOverlayTypes.map((type) =>
		createOpenWeatherMapOverlay(type, PUBLIC_OPEN_WEATHER_MAP_APP_ID)
	);

	const markers = data.locations.map(createMapMarker);

	const unsubscribe = latestLocation.subscribe((location) => {
		if (location) {
			const marker = createMapMarker(location);
			latestMapMarker.set(marker);
		}
	});
	onDestroy(unsubscribe);
</script>

<section class="section">
	<UserWelcome
		user={data.user}
		message={"Welcome to your dashboard, where you can view your locations and add new ones."}
	/>
	<LeafletMap
		id="hero-map"
		style="height: 75vh;"
		showZoomControl={true}
		showLayerControl={true}
		{markers}
		{latestMapMarker}
		{overlays}
	/>
	<LocationList locations={data.locations} {latestLocation} />
	<LocationForm onAdd={latestLocation.set} />
</section>
