export interface User {
  _id: string;
  username: string;
  token: string;
  displayName: string;
  avatar?: string | null;
  googleID?: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
  avatar: File | null;
}

export interface LoginMutation {
  username: string;
  password: string;
}