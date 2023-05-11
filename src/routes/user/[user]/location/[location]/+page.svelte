<script lang="ts">
	import Header from '$lib/Header.svelte';
	import PhotoList from '$lib/PhotoList.svelte';
	import MainNavigator from '$lib/MainNavigator.svelte';
	import PhotoForm from '$lib/PhotoForm.svelte';

	export let data;
</script>

<Header>
  <MainNavigator />
</Header>

<section class="section">
  <h1 class="title">Location</h1>
  <PhotoList photos={data.photos} />
  <PhotoForm />
</section>