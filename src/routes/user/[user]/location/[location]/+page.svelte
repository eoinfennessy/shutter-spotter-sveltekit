<script lang="ts">
	import PhotoForm from '$lib/PhotoForm.svelte';
	import LocationDisplay from '$lib/LocationDisplay.svelte';
	import PhotoGallery from '$src/lib/PhotoGallery.svelte';
	import { latestPhoto } from '$src/stores';

	export let data;
</script>

<section class="section">
	<LocationDisplay location={data.location} />
  <PhotoGallery photos={data.photos} latestPhotoStore={latestPhoto} />
  <PhotoForm onAdd={latestPhoto.set} />
</section>