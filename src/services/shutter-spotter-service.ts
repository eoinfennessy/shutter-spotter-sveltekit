import axios, { AxiosError } from "axios";
import { user } from "../stores";
import type { NewLocation, Location, Photo, PhotoApiPayload } from "./shutter-spotter-types";

export const shutterSpotterService = {
	baseUrl: "http://localhost:3000",
	// baseUrl: "https://shutter-spotter-2.onrender.com",

	async login(email: string, password: string) {
		try {
			const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, { email, password });
			axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
			if (response.data.success) {
				user.set({ _id: response.data._id, email, token: response.data.token });
				localStorage.shutterSpotter = JSON.stringify({
					_id: response.data._id,
					email,
					token: response.data.token,
				});
				return true;
			}
			return false;
		} catch (error) {
			console.log(error);
			return false;
		}
	},

	async loginWithGithub(code: string) {
		try {
			const response = await axios.post(`${this.baseUrl}/api/users/authenticate/github`, { code });
			if (response.data.success) {
				axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
				user.set({ _id: response.data._id, email: response.data.email, token: response.data.token });
				localStorage.shutterSpotter = JSON.stringify({
					_id: response.data._id,
					email: response.data.email,
					token: response.data.token,
				});
				return { success: true as const, userId: response.data._id };
			}
			return { success: false as const, error: { status: response.status, error: response.statusText } };
		} catch (error) {
			console.error(error);
			return { success: false as const, error: { status: 500, error } };
		}
	},

	async logout() {
		axios.defaults.headers.common["Authorization"] = "";
		user.set({ _id: "", email: "", token: "" });
		localStorage.removeItem("shutterSpotter");
	},

	async signup(firstName: string, lastName: string, email: string, password: string) {
		try {
			const userDetails = { firstName, lastName, email, password };
			await axios.post(`${this.baseUrl}/api/users`, userDetails);
			return true;
		} catch (error) {
			return false;
		}
	},

	async signupWithGithub(code: string) {
		try {
			const res = await axios.post(`${this.baseUrl}/api/users/github`, { code });
			return { success: true, res: res as any };
		} catch (error) {
			console.error(error);
			return { success: false, error };
		}
	},

	reload() {
		const credentials = localStorage.shutterSpotter;
		if (credentials) {
			const { _id, email, token } = JSON.parse(credentials);
			user.set({ _id, email, token });
			axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
		}
	},

	async createLocation(location: NewLocation, userId: string) {
		try {
			const res = await axios.post(`${this.baseUrl}/api/locations`, { ...location, userId });
			return { success: true, location: res.data as Location };
		} catch (error) {
			console.error(error);
			return { success: false };
		}
	},

	async getLocation(id: string, includeWeather = false) {
		try {
			const res = await axios.get(`${this.baseUrl}/api/locations/${id}?includeweather=${includeWeather}`);
			return { success: true, location: res.data as Location };
		} catch (error) {
			console.error(error);
			return { success: false, error };
		}
	},

	// async getAllLocations() {
	//   const res = await axios.get(`${this.baseUrl}/api/locations`);
	//   return res.data;
	// },

	async getUserLocations(userId: string): Promise<Location[]> {
		try {
			const res = await axios.get(`${this.baseUrl}/api/users/${userId}/locations`);
			return res.data as Location[];
		} catch (error) {
			console.error(error);
			return [];
		}
	},

	async deleteLocation(locationId: string, userId: string) {
		try {
			await axios.delete(`${this.baseUrl}/api/users/${userId}/locations/${locationId}`);
			return true;
		} catch (error) {
			return false;
		}
	},

	async createPhoto(photo: PhotoApiPayload) {
		try {
			const form = new FormData();
			form.append("title", photo.title);
			form.append("userId", photo.userId);
			form.append("locationId", photo.locationId);
			form.append("description", photo.description);
			form.append("tags", photo.tags);
			form.append("imagefile", new Blob([photo.imagefile]));
			const res = await axios.post(`${this.baseUrl}/api/photos`, form);
			return { success: true, photo: res.data as Photo };
		} catch (error) {
			console.error(error);
			return { success: false };
		}
	},

	async getLocationPhotos(locationId: string): Promise<Photo[]> {
		try {
			const res = await axios.get(`${this.baseUrl}/api/locations/${locationId}/photos`);
			return res.data;
		} catch (error) {
			console.error(error);
			return [];
		}
	},

	async deletePhoto(id: string, userId: string) {
		try {
			await axios.delete(`${this.baseUrl}/api/users/${userId}/photos/${id}`);
			return true;
		} catch (error) {
			return false;
		}
	},

	async getUserCount() {
		try {
			const res = await axios.get(`${this.baseUrl}/api/analytics/user-count`);
			return { success: true, ...res.data } as { success: true; userCount: number };
		} catch (error) {
			console.error(error);
			console.error(typeof error);
			return { success: false, error } as { success: false; error: AxiosError };
		}
	},

	async getLocationCount() {
		try {
			const res = await axios.get(`${this.baseUrl}/api/analytics/location-count`);
			return { success: true, ...res.data } as { success: true; locationCount: number };
		} catch (error) {
			console.error(error);
			return { success: false, error } as { success: false; error: AxiosError };
		}
	},

	async getPhotoCount() {
		try {
			const res = await axios.get(`${this.baseUrl}/api/analytics/photo-count`);
			return { success: true, ...res.data } as { success: true; photoCount: number };
		} catch (error) {
			console.error(error);
			return { success: false, error } as { success: false; error: AxiosError };
		}
	},

	async getLocationCountByCategory() {
		try {
			const res = await axios.get(`${this.baseUrl}/api/analytics/location-count-by-category`);
			return { success: true, ...res.data } as { success: true; locationCountByCategory: Record<string, number> };
		} catch (error) {
			console.error(error);
			return { success: false, error } as { success: false; error: AxiosError };
		}
	},

	async getAllUserCreationTimes() {
		try {
			const res = await axios.get(`${this.baseUrl}/api/analytics/user-creation-times`);
			return { success: true, userCreationTimes: res.data } as { success: true; userCreationTimes: string[] };
		} catch (error) {
			console.error(error);
			return { success: false, error } as { success: false; error: AxiosError };
		}
	},
};
