<script lang="ts">
	import { user } from "../stores";
	import type { Location } from "../services/shutter-spotter-types";
	import { shutterSpotterService } from "$services/shutter-spotter-service";
	import type { Writable } from "svelte/store";
	import { onDestroy } from "svelte";
	import LeafletMap from "./LeafletMap.svelte";

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
	<div class="box">
		<div class="tile is-ancestor">

			<div class="tile is-parent is-4">
				<LeafletMap
					markers={[
						{
							coordinates: {
								lat: location.latitude,
								lng: location.longitude,
							},
							popupText: location.name,
						},
					]}
					id={`map-${location._id}`}
					htmlClass="tile is-child"
					style="height: 30vh;"
				/>
			</div>

			<div class="tile is-parent media">
				<div class="tile is-child">
					<h2 class="title">
						{location.name}
						<span class="tag is-primary block">
							{location.category}
						</span>
					</h2>
					<p class="block">
						{location.description}
					</p>
					<p />
					<a href="/user/{$user._id}/location/{location._id}" class="button">
						<span class="icon is-small">
							<i class="fas fa-folder-open" />
						</span>
					</a>
					<button on:click={() => deleteLocation(location._id)} class="button">
						<i class="fas fa-trash" />
					</button>
				</div>
			</div>
		</div>
	</div>
{/each}
