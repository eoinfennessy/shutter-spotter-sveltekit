<script lang="ts">
	import { beforeUpdate } from "svelte";
	import { shutterSpotterService } from "../services/shutter-spotter-service";
	import Header from "$src/lib/Header.svelte";
	import WelcomeNavigator from "$src/lib/WelcomeNavigator.svelte";
	import { user } from "$src/stores";
	import MainNavigator from "$src/lib/MainNavigator.svelte";

	beforeUpdate(() => {
		shutterSpotterService.reload();
	});
</script>

<Header>
	{#if $user?._id}
		<MainNavigator />
	{:else}
		<WelcomeNavigator />
	{/if}
</Header>

<div class="section">
	<div class="container">
		<slot />
	</div>
</div>
