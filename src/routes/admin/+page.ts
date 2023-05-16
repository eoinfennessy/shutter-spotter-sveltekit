import { shutterSpotterService } from "$services/shutter-spotter-service";
import { error } from "@sveltejs/kit";

export const ssr = false;

export const load = async ({ params }) => {
	shutterSpotterService.reload();

	const userCountPromise = shutterSpotterService.getUserCount();
	const locationCountPromise = shutterSpotterService.getLocationCount();
	const photoCountPromise = shutterSpotterService.getPhotoCount();
	const locationCountByCategoryPromise = shutterSpotterService.getLocationCountByCategory();
	const userCreationTimesPromise = shutterSpotterService.getAllUserCreationTimes();

	const userCountRes = await userCountPromise;
	if (!userCountRes.success) throw error(userCountRes.error.status ?? 500, userCountRes.error);
	const locationCountRes = await locationCountPromise;
	if (!locationCountRes.success) throw error(locationCountRes.error.status ?? 500, locationCountRes.error);
	const photoCountRes = await photoCountPromise;
	if (!photoCountRes.success) throw error(photoCountRes.error.status ?? 500, photoCountRes.error);
	const locationCountByCategoryRes = await locationCountByCategoryPromise;
	if (!locationCountByCategoryRes.success) throw error(locationCountByCategoryRes.error.status ?? 500, locationCountByCategoryRes.error);
	const userCreationTimesRes = await userCreationTimesPromise;
	if (!userCreationTimesRes.success) throw error(userCreationTimesRes.error.status ?? 500, userCreationTimesRes.error);

	const userCount = userCountRes.userCount;
	const locationCount = locationCountRes.locationCount;
	const photoCount = photoCountRes.photoCount;
	const locationCountByCategory = locationCountByCategoryRes.locationCountByCategory;
	const userCreationTimes = userCreationTimesRes.userCreationTimes;

	const avgLocationsPerUser = userCount !== 0 ? locationCount / userCount : 0;
	const avgPhotosPerUser = userCount !== 0 ? photoCount / userCount : 0;
	const avgPhotosPerLocation = locationCount !== 0 ? photoCount / locationCount : 0;

	return {
		userCount,
		locationCount,
		photoCount,
		locationCountByCategory,
		avgLocationsPerUser,
		avgPhotosPerUser,
		avgPhotosPerLocation,
    userCreationTimes,
	};
};
