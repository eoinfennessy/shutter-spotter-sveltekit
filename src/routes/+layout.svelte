<script lang="ts">
	import { beforeUpdate, onMount } from "svelte";
	import { shutterSpotterService } from "../services/shutter-spotter-service";

	onMount(() => {
		localStorage.setItem("imageServerBaseUrl", "http://localhost:3000")
	})

	beforeUpdate(() => {
		shutterSpotterService.reload();
	});
</script>

<div class="container">
	<slot />
</div>
