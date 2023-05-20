import { shutterSpotterService } from "$services/shutter-spotter-service";
import { error } from "@sveltejs/kit";

export const ssr = false;

export const load = async ({ params }) => {
	try {
		shutterSpotterService.reload();
		const photos = await shutterSpotterService.getUserPhotos(params.user);
		return { photos };
	} catch (err) {
		console.error(err);
		throw error(500, err as string);
	}
};
