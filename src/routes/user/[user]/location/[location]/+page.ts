import { shutterSpotterService } from "$services/shutter-spotter-service"
import type { Location } from "$src/services/shutter-spotter-types.js";
import { error } from "@sveltejs/kit";

export const ssr = false;

export const load = async ({ params }) => {
	try {
		shutterSpotterService.reload();
		const location = await shutterSpotterService.getLocation(params.location, true);
		if (!location.success) throw error(500, location.error as string || "Something went wrong")
		const photos = await shutterSpotterService.getLocationPhotos(params.location);
		return { location: location.location as Location, photos };
	} catch (err) {
		console.error(err);
		throw error(500, err as string)
	}
};