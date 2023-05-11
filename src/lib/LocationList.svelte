<script lang="ts">
  import { user } from "../stores";
	import type { Location } from "../services/shutter-spotter-types";
	import { shutterSpotterService } from "$services/shutter-spotter-service";

  export let locations: Location[];

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
    <p>
    <div class="block">
      <p>
        Latitude: {location.latitude}
      <p>
      <p>
        Longitude: {location.longitude}
      <p>
    </div>
    <a href="/user/{$user._id}/location/{location._id}" class="button">
      <span class="icon is-small">
        <i class="fas fa-folder-open"></i>
      </span>
    </a>
    <button on:click={() => deleteLocation(location._id)} class="button">
      <i class="fas fa-trash"></i>
    </button>
  </div>
{/each}