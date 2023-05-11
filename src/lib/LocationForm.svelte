<script lang="ts">
	import { shutterSpotterService } from "$services/shutter-spotter-service";
	import type { LocationCategory } from "$services/shutter-spotter-types";
	import { user } from "../stores";

	export let onAdd: CallableFunction;

	let name: string;
	let description: string;
	let category: LocationCategory;
	let latitude: number;
	let longitude: number;

	async function addLocation() {
		await shutterSpotterService.createLocation({ name, description, category, latitude, longitude }, $user._id);
		onAdd();
		name = "";
		description = "";
		latitude = 0.0;
		longitude = 0.0;
	}
</script>

<div class="box">
	<form on:submit|preventDefault={addLocation}>
		<div class="field">
			<label class="label" for="name">Location Name</label>
			<input
				bind:value={name}
				class="input"
				id="name"
				type="text"
				placeholder="Enter location name"
				name="name"
			/>
		</div>
		<div class="field">
			<label class="label" for="description">Description</label>
			<textarea
				bind:value={description}
				class="textarea"
				id="description"
				placeholder="Enter a description of the location"
				name="description"
			/>
		</div>
		<div class="field">
			<label class="label" for="category">Category</label>
			<div class="select">
				<select bind:value={category} name="category" id="category">
					<option>Select Category</option>
					<option>Aerial</option>
					<option>Architecture</option>
					<option>Landscape</option>
					<option>Macro</option>
					<option>Nature</option>
					<option>Street</option>
					<option>Wildlife</option>
				</select>
			</div>
		</div>
		<div class="field">
			<label class="label" for="latitude">Latitude</label>
			<input
				bind:value={latitude}
				class="input"
				id="latitude"
				type="float"
				placeholder="Enter latitude"
				name="latitude"
			/>
		</div>
		<div class="field">
			<label class="label" for="longitude">Longitude</label>
			<input
				bind:value={longitude}
				class="input"
				id="longitude"
				type="float"
				placeholder="Enter longitude"
				name="longitude"
			/>
		</div>
		<button class="button is-link">Add Location</button>
	</form>
</div>
