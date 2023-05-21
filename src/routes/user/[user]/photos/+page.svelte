<script lang="ts">
	import PhotoGallery from "$src/lib/PhotoGallery.svelte";

	export let data;
</script>

<h1 class="title">All My Photos</h1>
<PhotoGallery photos={data.photos} />
