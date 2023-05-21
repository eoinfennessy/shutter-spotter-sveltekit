<script lang="ts">
	import type { User } from "$src/services/shutter-spotter-types";
	import Avatar from "./Avatar.svelte";

	export let user: User;
	export let messageHeading = `Hello, ${user.firstName}!`;
	export let message = "";

	const avatarSrc = user.avatarSrc ?? `https://robohash.org/${user._id}`;
</script>

<div class="box">
	<div class="columns">
		<div class="column is-narrow">
			<Avatar src={avatarSrc} />
		</div>
		<div class="column m-auto">
			<h1 class="title">{messageHeading}</h1>
			{#if message}
				<p class="subtitle">{message}</p>
			{/if}
		</div>
	</div>
</div>
