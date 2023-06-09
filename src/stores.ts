import type { Location, LoggedInUser, Photo } from "$services/shutter-spotter-types";
import {writable} from "svelte/store";
import type { MapMarker } from "./services/leaflet-map-types";
import type { SvelteComponent } from "svelte";

export const user = writable<LoggedInUser>();

export const latestLocation = writable<Location>();

export const latestMapMarker = writable<MapMarker>();

export const latestPhoto = writable<Photo>();

export const lastDeletedPhotoId = writable<string>();

export const photoModal = writable<typeof SvelteComponent | null>();
