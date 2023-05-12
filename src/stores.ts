import type { Location, Photo } from "$services/shutter-spotter-types";
import {writable} from "svelte/store";

export const user = writable({
  _id: "",
  email: "",
  token: "",
});

export const latestLocation = writable<Location>();

export const latestPhoto = writable<Photo>();
