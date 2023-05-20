<script lang="ts">
	import Modal, { bind } from "svelte-simple-modal";
	import Header from "$lib/Header.svelte";
	import MainNavigator from "$lib/MainNavigator.svelte";
	import PhotoGallery from "$src/lib/PhotoGallery.svelte";

	export let data;
</script>

<Header>
	<MainNavigator />
</Header>

<h1 class="title">All My Photos</h1>
<PhotoGallery photos={data.photos} />
