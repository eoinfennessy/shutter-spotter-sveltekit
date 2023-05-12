export type Coordinates = {
  lat: number, 
  lng: number,
};

export type MapMarker = {
  coordinates: Coordinates,
  popupText?: string,
  layerTitle?: string,
}