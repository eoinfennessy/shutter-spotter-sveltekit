<script lang="ts">
	import type { Photo } from "../services/shutter-spotter-types";
	import { shutterSpotterService } from "$services/shutter-spotter-service";
	import type { Writable } from "svelte/store";
	import { onDestroy } from "svelte";
	import { PUBLIC_IMAGE_SERVER_HOST } from "$env/static/public"

	export let photos: Photo[];
	export let photoStore: Writable<Photo>;

	const unsubscribe = photoStore.subscribe((photo) => {
		if (photo) {
			photos.push(photo);
			photos = photos;
		}
	});

	onDestroy(unsubscribe);

	async function deletePhoto(photoId: string, userId: string) {
		const success = await shutterSpotterService.deletePhoto(photoId, userId);
		if (success) {
			const photoIndex = photos.findIndex((photo) => photo._id === photoId);
			photos.splice(photoIndex, 1);
			photos = photos;
		}
	}
</script>

<table class="table is-fullwidth">
	<thead>
		<tr>
			<th>Title</th>
			<th>Description</th>
			<th>Thumbnail</th>
			<th>Tags</th>
			<th />
		</tr>
	</thead>
	<tbody>
		{#each photos as photo}
			<tr>
				<td>
					{photo.title}
				</td>
				<td>
					{photo.description}
				</td>
				<td>
					<img src="{PUBLIC_IMAGE_SERVER_HOST}{photo.img}" alt={photo.title} />
				</td>
				<td>
					{#each photo.tags as tag}
						<span class="tag is-info">{tag}</span>
					{/each}
				</td>
				<td>
					<button on:click={() => deletePhoto(photo._id, photo.userId)} class="ui icon button">
						<i class="fas fa-trash" />
					</button>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
