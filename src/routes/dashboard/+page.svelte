<script lang="ts">
	import Header from '$lib/Header.svelte';
	import LocationList from '$lib/LocationList.svelte';
	import LocationForm from '$lib/LocationForm.svelte';
	import MainNavigator from '$lib/MainNavigator.svelte';

	import type { Location } from '../../services/shutter-spotter-types';

	const placeholderLocations: Location[] = [
		{
			name: 'Woodstown',
			description: 'Woodstown beach',
			category: 'Landscape',
			latitude: 12,
			longitude: 3.5,
      timeCreated: "2023-05-10T11:24:03.463Z",
      userId: "12345",
      _id: "asdfg",
		}
	];
</script>

<Header>
  <MainNavigator />
</Header>

<section class="section">
  <h1 class="title">My Dashboard</h1>
  <LocationList locations={placeholderLocations} />
  <LocationForm />
</section>
