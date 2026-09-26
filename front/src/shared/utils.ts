import { apiURL } from "./axios/AxiosApi.ts";

export const getImageUrl = (image?: string | null) => {
  if (!image) return undefined;
  if (/^https?:\/\//i.test(image)) return image;

  return new URL(image, apiURL).href;
};