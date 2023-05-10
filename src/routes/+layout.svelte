<script lang="ts">
	import { beforeUpdate } from "svelte";
	import { shutterSpotterService } from "../services/shutter-spotter-service";

	beforeUpdate(() => {
		shutterSpotterService.reload();
	});
</script>

<div class="container">
	<slot />
</div>
