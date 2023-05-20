<script lang="ts">
	import Header from '$lib/Header.svelte';
	import MainNavigator from '$lib/MainNavigator.svelte';
	import PhotoForm from '$lib/PhotoForm.svelte';
	import LocationDisplay from '$lib/LocationDisplay.svelte';
	import PhotoGallery from '$src/lib/PhotoGallery.svelte';
	import { latestPhoto } from '$src/stores';

	export let data;
</script>

<Header>
  <MainNavigator />
</Header>

<section class="section">
	<LocationDisplay location={data.location} />
  <PhotoGallery photos={data.photos} latestPhotoStore={latestPhoto} />
  <PhotoForm onAdd={latestPhoto.set} />
</section>