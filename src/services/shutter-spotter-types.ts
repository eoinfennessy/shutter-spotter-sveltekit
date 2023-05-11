export type LocationCategory = "Landscape" | "Nature" | "Wildlife" | "Architecture" | "Macro" | "Aerial" | "Street";

export type NewLocation = {
  name: string;
  description: string;
  category: LocationCategory;
  latitude: number;
  longitude: number;
}

export type Location = {
  name: string;
  description: string;
  category: LocationCategory;
  latitude: number;
  longitude: number;
  timeCreated: string;
  userId: string;
  _id: string;
}

// Photo

export type Comment = {
  userId: string;
  comment: string;
};

export type Vote = {
  userId: string;
  vote: -1 | 1;
};

export type PhotoApiPayload = {
  title: string;
  description: string;
  imagefile: File | string;
  tags: string;
  userId: string;
  locationId: string;
};

export type Photo = {
  title: string;
  description: string;
  timeCreated: string;
  comments: Comment[];
  voteScore: number;
  votes: Vote[];
  img: string;
  tags: string[];
  locationId: string;
  userId: string;
  _id: string;
};
