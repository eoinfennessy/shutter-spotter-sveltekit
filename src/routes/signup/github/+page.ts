import { shutterSpotterService } from "$src/services/shutter-spotter-service.js";
import { error, redirect } from "@sveltejs/kit";

export const load = async ({ url }) => {
  const code = url.searchParams.get("code")
  if (code === null) throw error(400, "No code provided as query param from GitHub");
  const response = await shutterSpotterService.signupWithGithub(code);
  if (!response.success) throw error(500, response.error as string | Error)
  throw redirect(307, "/login")
}
