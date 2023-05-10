import axios from "axios";
import { user } from "../stores";

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

	reload() {
		const credentials = localStorage.shutterSpotter;
		if (credentials) {
			const { _id, email, token } = JSON.parse(credentials);
			user.set({ _id, email, token });
			axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
		}
	},
};