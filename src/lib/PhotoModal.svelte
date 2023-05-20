<script lang="ts">
	import { PUBLIC_IMAGE_SERVER_HOST } from "$env/static/public";
	import { shutterSpotterService } from "$src/services/shutter-spotter-service";
	import type { Photo } from "$src/services/shutter-spotter-types";
	import { lastDeletedPhotoId, photoModal } from "$src/stores";

	export let photo: Photo;

	async function deletePhoto(photoId: string, userId: string) {
		const success = await shutterSpotterService.deletePhoto(photoId, userId);
		if (success) {
			photoModal.set(null);
			lastDeletedPhotoId.set(photoId);
		}
	}
</script>

<h1 class="title">{photo.title}</h1>
<div class="block">
	<img src="{PUBLIC_IMAGE_SERVER_HOST}{photo.img}" alt={photo.title} />
</div>

<div class="columns">
	<div class="column">
		<div class="tags">
			{#each photo.tags as tag}
				<span class="tag is-info">{tag}</span>
			{/each}
		</div>
	</div>
	<div class="column is-narrow">
		<button on:click={() => deletePhoto(photo._id, photo.userId)} class="ui icon button is-narrow">
			<i class="fas fa-trash" />
		</button>
	</div>
</div>

<p>{photo.description}</p>
