import { shutterSpotterService } from "$services/shutter-spotter-service";
import { error } from "@sveltejs/kit";

export const ssr = false;

export const load = async ({ params }) => {
	shutterSpotterService.reload();
	const userRes = await shutterSpotterService.getUser(params.user);
	if (!userRes.success) throw error(500, (userRes.error as string) || "Something went wrong");
	return {
		user: userRes.user,
		locations: await shutterSpotterService.getUserLocations(params.user),
	};
};
