<script lang="ts">
	import Header from '$lib/Header.svelte';
	import LocationList from '$lib/LocationList.svelte';
	import LocationForm from '$lib/LocationForm.svelte';
	import MainNavigator from '$lib/MainNavigator.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let data;
</script>

<Header>
  <MainNavigator />
</Header>

<section class="section">
  <h1 class="title">My Dashboard</h1>
  <LocationList locations={data.locations} />
  <LocationForm onAdd={() => goto($page.url.pathname, { noScroll: true, invalidateAll: true })}/>
</section>
