export type Coordinates = {
	lat: number;
	lng: number;
};

export type MapMarker = {
	coordinates: Coordinates;
	popupText?: string;
	layerTitle?: string;
};

export type Overlay = {
	name: string;
	url: string;
	options: Record<string, string | boolean | number | string[]>;
};
