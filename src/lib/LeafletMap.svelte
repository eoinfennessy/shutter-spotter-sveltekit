<script lang="ts">
	import "leaflet/dist/leaflet.css";
	import { LeafletMap } from "../services/leaflet-map";
	import { onDestroy, onMount } from "svelte";
	import type { MapMarker } from "$src/services/leaflet-map-types";
	import type { Writable } from "svelte/store";

	export let showZoomControl = false;
	export let showLayerControl = false;
	export let id = "leaflet-map";
	export let htmlClass = "box";
	export let style = "";
	export let markers: MapMarker[] = [];
	export let latestMapMarker: Writable<MapMarker>;

	const mapConfig = {
		location: { lat: 52.160858, lng: -7.15242 },
		zoom: 8,
		minZoom: 1,
	};

	let map: LeafletMap;

	onMount(async () => {
		map = new LeafletMap(id, mapConfig);

		if (showZoomControl) map.showZoomControl();
		markers.forEach((marker) => {
			map.addMarker(marker.coordinates, marker.popupText, marker.layerTitle);
		});
		if (showLayerControl) map.showLayerControl();
	});

	const unsubscribe = latestMapMarker.subscribe((marker) => {
		if (marker && map) {
			map.addMarker(marker.coordinates, marker.popupText, marker.layerTitle);
			map.moveTo(8, marker.coordinates);
		}
	});
	onDestroy(unsubscribe);
</script>

<div {id} class={htmlClass} {style} />
