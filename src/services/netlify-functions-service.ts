import axios, { AxiosError } from "axios";

export class NetlifyFunctionsService {
	baseUrl: string;

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	async hello() {
		try {
			const res = await axios.get(`${this.baseUrl}/.netlify/functions/hello`);
			return { success: true as const, data: res.data };
		} catch (error) {
			console.error(error);
			return { success: false, error } as { success: false; error: AxiosError };
		}
	}

	async processImage(image: string, sharpen: boolean, greyscale: boolean, watermarkText: string) {
		const url = `${this.baseUrl}/.netlify/functions/image-processor?sharpen=${sharpen}&greyscale=${greyscale}&watermark=${watermarkText}`
		console.log(url)
		try {
			const res = await axios.post(url, image);
			return { success: true, data: res.data };
		} catch (error) {
			console.error(error);
			return { success: false, error } as { success: false; error: AxiosError };
		}
	}
}
