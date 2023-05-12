<script lang="ts">
	import { user } from "../stores";
	import type { Location } from "../services/shutter-spotter-types";
	import { shutterSpotterService } from "$services/shutter-spotter-service";
	import type { Writable } from "svelte/store";
	import { onDestroy } from "svelte";

	export let locations: Location[];
	export let latestLocation: Writable<Location>;

	const unsubscribe = latestLocation.subscribe((location) => {
		if (location) {
			locations.push(location);
			locations = locations;
		}
	});
	onDestroy(unsubscribe);

	async function deleteLocation(locationId: string) {
		const success = await shutterSpotterService.deleteLocation(locationId, $user._id);
		if (success) {
			const locationIndex = locations.findIndex((location) => location._id === locationId);
			locations.splice(locationIndex, 1);
			locations = locations;
		}
	}
</script>

{#each locations as location}
	<div class="box box-link-hover-shadow">
		<h2 class="title">
			{location.name}
		</h2>
		<span class="tag is-primary block">
			{location.category}
		</span>
		<p class="block">
			{location.description}
		</p>
		<p />
		<div class="block">
			<p>
				Latitude: {location.latitude}
			</p>
			<p />
			<p>
				Longitude: {location.longitude}
			</p>
			<p />
		</div>
		<a href="/user/{$user._id}/location/{location._id}" class="button">
			<span class="icon is-small">
				<i class="fas fa-folder-open" />
			</span>
		</a>
		<button on:click={() => deleteLocation(location._id)} class="button">
			<i class="fas fa-trash" />
		</button>
	</div>
{/each}
