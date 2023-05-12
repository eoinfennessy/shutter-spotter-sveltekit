<script lang="ts">
	import Header from "$lib/Header.svelte";
	import LocationList from "$lib/LocationList.svelte";
	import LocationForm from "$lib/LocationForm.svelte";
	import MainNavigator from "$lib/MainNavigator.svelte";
	import { latestLocation, latestMapMarker } from "$src/stores";
	import LeafletMap from "$src/lib/LeafletMap.svelte";
	import type { Location } from "$src/services/shutter-spotter-types.js";
	import { onDestroy } from "svelte";
	import type { MapMarker } from "$src/services/leaflet-map-types.js";

	export let data;

	function createMapMarker(location: Location): MapMarker {
		return {
			coordinates: {
				lat: location.latitude,
				lng: location.longitude,
			},
			popupText: location.name,
			layerTitle: location.category,
		}
	}
	
	const markers = data.locations.map(createMapMarker);

	const unsubscribe = latestLocation.subscribe((location) => {
		if (location) {
			const marker = createMapMarker(location)
			latestMapMarker.set(marker);
		}
	});
	onDestroy(unsubscribe);
</script>

<Header>
	<MainNavigator />
</Header>

<section class="section">
	<h1 class="title">My Dashboard</h1>
	<LeafletMap
		id="hero-map"
		style="height: 75vh;"
		showZoomControl={true}
		showLayerControl={true}
		markers={markers}
		latestMapMarker={latestMapMarker}
	/>
	<LocationList locations={data.locations} latestLocation={latestLocation} />
	<LocationForm onAdd={latestLocation.set} />
</section>
