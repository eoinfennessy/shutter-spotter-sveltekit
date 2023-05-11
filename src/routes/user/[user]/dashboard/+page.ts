import { shutterSpotterService } from "$services/shutter-spotter-service"

export const ssr = false;

export const load = async ({ params }) => {
	shutterSpotterService.reload();
	return {
		locations: await shutterSpotterService.getUserLocations(params.user),
	};
};