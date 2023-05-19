<script lang="ts">
	import { base64 } from "rfc4648";
	import { shutterSpotterService } from "$services/shutter-spotter-service";
	import { page } from "$app/stores";
	import { user } from "../stores";
	import { NetlifyFunctionsService } from "$src/services/netlify-functions-service";

	export let onAdd: CallableFunction;

	const fnService = new NetlifyFunctionsService($page.url.origin);
	let title = "";
	let description = "";
	let tags = "";
	let imagefile: FileList;
	let watermark = false;
	let watermarkText = "";
	let sharpen = false;
	let greyscale = false;

	$: imageDisplayName = imagefile ? imagefile[0].name : "No File Selected";

	async function hello() {
		const res = await fnService.hello();
		console.log(res);
	}

	async function addPhoto() {
		let processedImageArray;
		if (watermark || sharpen || greyscale) {
			const imageBuffer = await imagefile[0].arrayBuffer();
			const base64image = base64.stringify(new Uint8Array(imageBuffer));
			watermarkText = watermark ? watermarkText : "";
			const res = await fnService.processImage(base64image, sharpen, greyscale, watermarkText);
			console.log(res);
			if (res.success) processedImageArray = base64.parse(res.data);
		}

		const { success, photo } = await shutterSpotterService.createPhoto({
			userId: $user._id,
			locationId: $page.params.location,
			imagefile: processedImageArray ?? imagefile[0],
			title,
			description,
			tags,
		});
		if (success) {
			onAdd(photo);
			title = "";
			description = "";
			tags = "";
			watermark = false;
			watermarkText = "";
			sharpen = false;
			greyscale = false;
		}
	}
</script>

<form on:submit|preventDefault={addPhoto}>
	<label for="imagefile" class="subtitle is-5">Enter Photo Details:</label>
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
	<div class="field is-horizontal block">
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

	<div class="block">
		<h3 class="subtitle is-5">Image Processing Options:</h3>
		<div class="block">
			<label class="checkbox">
				<input bind:checked={watermark} type="checkbox" />
				Add Watermark
			</label>
			<input
				bind:value={watermarkText}
				disabled={!watermark}
				class="input"
				type="text"
				placeholder="Enter Watermark Text"
				name="watermark-text"
			/>
		</div>
		<div class="block">
			<label class="checkbox">
				<input bind:checked={sharpen} type="checkbox" />
				Sharpen
			</label>
			<label class="checkbox">
				<input bind:checked={greyscale} type="checkbox" />
				Convert to Greyscale
			</label>
		</div>
	</div>
	<button class="button is-primary">Add Photo</button>
</form>

<button on:click={hello} class="button is-primary">Hello</button>
