import type { MapMarker, Overlay } from "$src/services/leaflet-map-types";
import type { Location } from "$src/services/shutter-spotter-types";

export type OpenWeatherMapType = "Clouds" | "Precipitation" | "Pressure" | "Wind" | "Temperature";

export function createMapMarker(location: Location): MapMarker {
	return {
		coordinates: {
			lat: location.latitude,
			lng: location.longitude,
		},
		popupText: `<a href="/user/${location.userId}/location/${location._id}">${location.name}</a>`,
		layerTitle: location.category,
	};
}

export function createOpenWeatherMapOverlay(
	type: OpenWeatherMapType,
	appId: string,
	options = {}
): Overlay {
	let layer: string;
	switch (type) {
		case "Clouds":
			layer = "clouds_new";
			break;
		case "Precipitation":
			layer = "precipitation_new";
			break;
		case "Pressure":
			layer = "pressure_new";
			break;
		case "Wind":
			layer = "wind_new";
			break;
		case "Temperature":
			layer = "temp_new";
			break;
	}
	return {
		name: type,
		url: `https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${appId}`,
		options: {
			...options,
			attribution: "Map data &copy; <a href=\"http://openweathermap.org\">OpenWeatherMap</a>",
		},
	};
}
