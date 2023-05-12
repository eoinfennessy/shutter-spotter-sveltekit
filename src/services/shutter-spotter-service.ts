import axios from "axios";
import { user } from "../stores";
import type { NewLocation, Location, Photo, PhotoApiPayload } from "./shutter-spotter-types";

export const shutterSpotterService = {
	baseUrl: "http://localhost:3000",

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

	async signupWithGithub() {
		try {
			await axios.post(`${this.baseUrl}/api/users/github`);
			return true;
		} catch (error) {
			return false;
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

  // async getLocation(id: string) {
  //   const res = await axios.get(`${this.baseUrl}/api/locations/${id}`);
  //   return res.data;
  // },

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
			return { success: false }
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
			return false
		}
  },
};
