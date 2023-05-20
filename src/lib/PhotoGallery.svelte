<script lang="ts">
	import { onDestroy } from "svelte";
	import type { Unsubscriber, Writable } from "svelte/store";
	import Modal, { bind } from "svelte-simple-modal";
	import { PUBLIC_IMAGE_SERVER_HOST } from "$env/static/public";
	import ImageGallery from "$src/lib/ImageGallery.svelte";
	import type { Photo } from "$src/services/shutter-spotter-types.js";
	import PhotoModal from "$src/lib/PhotoModal.svelte";
	import { lastDeletedPhotoId, photoModal } from "$src/stores.js";

	export let photos: Photo[];
	export let latestPhotoStore: Writable<Photo> | null = null;

	$: images = photos.map((photo, index) => ({
		src: `${PUBLIC_IMAGE_SERVER_HOST}${photo.img}`,
		alt: photo.title,
		id: index.toString(),
	}));

	function showModal(photo: Photo) {
		photoModal.set(bind(PhotoModal, { photo }));
	}

	function onImageClicked(e: any) {
		const photo = photos[e.detail.id];
		showModal(photo);
	}

	const unsubscribers: Unsubscriber[] = [];

	unsubscribers.push(
		lastDeletedPhotoId.subscribe((photoId) => {
			if (photoId) {
				const photoIndex = photos.findIndex((photo) => photo._id === photoId);
				photos.splice(photoIndex, 1);
				photos = photos;
			}
		})
	);

	if (latestPhotoStore) {
		unsubscribers.push(
			latestPhotoStore.subscribe((photo) => {
				if (photo) {
					photos.push(photo);
					photos = photos;
				}
			})
		);
	}

	onDestroy(() => {
		unsubscribers.forEach((unsubscribe) => unsubscribe());
	});
</script>

<Modal show={$photoModal} styleWindow={{ width: 'fit-content', maxWidth: "800px" }} />

<div class="box">
	<ImageGallery
		{images}
		gap={10}
		maxColumnWidth={250}
		on:click={onImageClicked}
		hover={true}
		loading="lazy"
	/>
</div>
