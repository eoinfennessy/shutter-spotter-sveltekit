import type { Location, Photo } from "$services/shutter-spotter-types";
import {writable} from "svelte/store";
import type { MapMarker } from "./services/leaflet-map-types";

export const user = writable({
  _id: "",
  email: "",
  token: "",
});

export const latestLocation = writable<Location>();

export const latestMapMarker = writable<MapMarker>();

export const latestPhoto = writable<Photo>();
