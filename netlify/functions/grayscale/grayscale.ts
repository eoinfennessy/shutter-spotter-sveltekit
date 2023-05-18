import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import sharp from "sharp"

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (event.body !== null) {
    console.log(event)
    sharp
    const img = sharp(Buffer.from(event.body, "base64"))
    const gray = img.grayscale()
    // gray.toFile("TEST.jpg")
    const buff = await gray.toBuffer();
    const image = buff.toString("base64");
    return {
      statusCode: 200,
      body: JSON.stringify({ image }),
    };
  }
  return {
    statusCode: 500,
    body: JSON.stringify({ error: "Something went wrong with the function" }),
  };
};

export { handler };
