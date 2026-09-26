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

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  name: string;
  message: string;
  _message: string;
}

export interface GlobalError {
  error: string
}