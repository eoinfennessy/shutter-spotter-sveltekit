<script lang="ts">
	import { shutterSpotterService } from "$services/shutter-spotter-service";
	import { page } from "$app/stores";
	import { user } from "../stores";

	export let onAdd: CallableFunction;

	let title = "";
	let description = "";
	let tags = "";
	let imagefile: FileList;

	$: imageDisplayName = imagefile ? imagefile[0].name : "No File Selected";

	async function addPhoto() {
		const { success, photo } = await shutterSpotterService.createPhoto({
			userId: $user._id,
			locationId: $page.params.location,
			imagefile: imagefile[0],
			title,
			description,
			tags,
		});
		if (success) {
			onAdd(photo);
			title = "";
			description = "";
			tags = "";
		}
	}
</script>

<form on:submit|preventDefault={addPhoto}>
	<label for="imagefile">Enter Photo Details:</label>
	<div class="field is-horizontal">
		<div class="field-body">
			<div class="field">
				<div id="file-select" class="file has-name is-fullwidth">
					<label class="file-label">
						<input
							bind:files={imagefile}
							class="file-input"
              id="imagefile"
							name="imagefile"
							type="file"
							accept="image/png, image/jpeg"
						/>
						<span class="file-cta">
							<span class="file-icon">
								<i class="fas fa-upload" />
							</span>
							<span class="file-label"> Choose an image… </span>
						</span>
						<span class="file-name">
              {imageDisplayName}
            </span>
					</label>
				</div>
			</div>
		</div>
	</div>
	<div class="field is-horizontal">
		<div class="field-body">
			<div class="field">
				<input
					bind:value={title}
					class="input"
					type="text"
					placeholder="Enter Title"
					name="title"
				/>
			</div>
			<div class="field">
				<input
					bind:value={description}
					class="input"
					type="text"
					placeholder="Enter Description"
					name="description"
				/>
			</div>
		</div>
	</div>
	<div class="field is-horizontal">
		<div class="field-body">
			<div class="field">
				<input
					bind:value={tags}
					class="input"
					type="text"
					placeholder="Enter a Space-Separated List of Tags"
					name="tags"
				/>
			</div>
		</div>
	</div>
	<button class="button is-primary">Add Photo</button>
</form>
