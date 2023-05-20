<!-- Based on https://github.com/berkinakkaya/svelte-image-gallery -->

<script lang="ts">
	import { onMount, createEventDispatcher } from "svelte";

	type img = {
		src: string;
		alt?: string;
		class?: string;
		id?: string;
	};

	export let images: img[] = [];
	export let gap = 10;
	export let maxColumnWidth = 250;
	export let hover = false;
	export let loading: "eager" | "lazy" = "eager";

	const dispatch = createEventDispatcher();

	let columns: img[][] = [];
	let galleryWidth: number;
	let columnCount: number;

	$: columnCount = Math.floor(galleryWidth / maxColumnWidth) || 1;
	$: columnCount && draw();
	$: images && draw();
	$: galleryStyle = `grid-template-columns: repeat(${columnCount}, 1fr); --gap: ${gap}px`;

	function draw() {
		columns = [];
		for (let i = 0; i < columnCount; i++) {
			columns.push([]);
		}
		for (let i = 0; i < images.length; i++) {
			const columnIndex = i % columnCount;
			columns[columnIndex].push(images[i]);
		}
	}

	function onClick(e: MouseEvent | KeyboardEvent) {
		if (e.target) {
			const target = e.target as HTMLImageElement;
			dispatch("click", {
				src: target.src,
				id: target.id,
				alt: target.alt,
				class: target.className,
			});
		}
	}

	onMount(draw);
</script>

<div id="gallery" bind:clientWidth={galleryWidth} style={galleryStyle}>
	{#each columns as column}
		<div class="column">
			{#each column as img}
				<img
					src={img.src}
					alt={img.alt}
					id={img.id}
					on:click={onClick}
					on:keypress={onClick}
					class="{hover === true ? 'img-hover' : ''} {img.class ?? ''}"
					{loading}
				/>
			{/each}
		</div>
	{/each}
</div>

<style>
	#gallery {
		width: 100%;
		display: grid;
		gap: var(--gap);
	}
	#gallery .column {
		display: flex;
		flex-direction: column;
	}
	#gallery .column * {
		width: 100%;
		margin-top: var(--gap);
	}
	#gallery .column *:nth-child(1) {
		margin-top: 0;
	}
	.img-hover {
		opacity: 0.9;
		transition: all 0.2s;
	}
	.img-hover:hover {
		opacity: 1;
		transform: scale(1.05);
	}
</style>
