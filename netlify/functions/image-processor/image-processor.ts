import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import sharp, { Sharp } from "sharp";

async function addWatermark(text: string, image: Sharp, width: number, height: number, gravity = "southeast") {
	const watermark = await sharp({
		text: {
			text: `<span foreground="white">${text}</span>`,
			rgba: true,
			width: width,
			height: height,
		},
	})
		.png()
		.toBuffer();
	return image.composite([{ input: watermark, gravity: gravity, blend: "soft-light" }]);
}

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
	if (event.body !== null) {
		let img = sharp(Buffer.from(event.body, "base64"));
		const imgMetadata = await img.metadata();

		if (event.queryStringParameters?.watermark) {
			img = await addWatermark(
				event.queryStringParameters.watermark,
				img,
				Math.round((imgMetadata.width as number) / 2),
				imgMetadata.height as number
			);
		}
		if (event.queryStringParameters?.sharpen === "true") {
			img = img.sharpen();
		}
		if (event.queryStringParameters?.greyscale === "true") {
			img = img.greyscale();
		}
		const imgBuffer = await img.toBuffer();
		const imgEncoded = imgBuffer.toString("base64");
		return {
			statusCode: 200,
			body: JSON.stringify({ image: imgEncoded }),
		};
	}
	return {
		statusCode: 500,
		body: JSON.stringify({ error: "Something went wrong with the function" }),
	};
};
