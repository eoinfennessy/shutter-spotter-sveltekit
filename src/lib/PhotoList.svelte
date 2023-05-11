<script lang="ts">
	import type { Photo } from "../services/shutter-spotter-types";
	import { shutterSpotterService } from "$services/shutter-spotter-service";

	export let photos: Photo[];

  const imageServerBaseUrl = localStorage.getItem("imageServerBaseUrl");

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
					<img src="{imageServerBaseUrl}{photo.img}" alt={photo.title} />
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
