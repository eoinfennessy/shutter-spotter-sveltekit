<script lang="ts">
	import Header from '$lib/Header.svelte';
	import PhotoList from '$lib/PhotoList.svelte';
	import MainNavigator from '$lib/MainNavigator.svelte';
	import PhotoForm from '$lib/PhotoForm.svelte';
	import { latestPhoto } from '$src/stores';
	import LocationDisplay from '$lib/LocationDisplay.svelte';

	export let data;
</script>

<Header>
  <MainNavigator />
</Header>

<section class="section">
	<LocationDisplay location={data.location} />
	<h1 class="title">Location Photos</h1>
  <PhotoList photos={data.photos} photoStore={latestPhoto} />
  <PhotoForm onAdd={latestPhoto.set} />
</section>