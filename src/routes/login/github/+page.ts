import { shutterSpotterService } from "$src/services/shutter-spotter-service.js";
import { error, redirect } from "@sveltejs/kit";

export const ssr = false;

export const load = async ({ url }) => {
  const code = url.searchParams.get("code")
  if (code === null) throw error(400, "No code provided as query param from GitHub");
  const response = await shutterSpotterService.loginWithGithub(code);
  if (!response.success) throw error(response.error.status, response.error.error as string | Error)
  throw redirect(307, `/user/${response.userId}/dashboard`)
}
