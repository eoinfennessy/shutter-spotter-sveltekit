import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  console.log(event);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello world!", event }),
  };
};

export { handler };