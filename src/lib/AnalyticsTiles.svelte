<script lang="ts">
	export let tileData: { title: string; value: number; class: string }[];
	export let parentClass = "is-vertical"
</script>

<div class="tile {parentClass}">
	{#each tileData as tile}
		<div
			class="tile is-child box notification has-text-weight-bold has-text-centered {tile.class}">
			<p class="is-size-1">{tile.value}</p>
			<p class="is-size-5">{tile.title}</p>
		</div>
	{/each}
</div>
