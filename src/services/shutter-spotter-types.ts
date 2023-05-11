export type NewLocation = {
  name: string;
  description: string;
  category: "Landscape" | "Nature" | "Wildlife" | "Architecture" | "Macro" | "Aerial" | "Street";
  latitude: number;
  longitude: number;
}

export type Location = {
  name: string;
  description: string;
  category: "Landscape" | "Nature" | "Wildlife" | "Architecture" | "Macro" | "Aerial" | "Street";
  latitude: number;
  longitude: number;
  timeCreated: string;
  userId: string;
  _id: string;
}
