import { OAuthSecretType } from "./constants.type";

export const ORIGIN = (
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_CLIENT_URL_PROD
    : process.env.NEXT_PUBLIC_CLIENT_URL_DEV
) as string;

export const OAUTH_SECRETS: OAuthSecretType =
  process.env.NODE_ENV === "production"
    ? {
        CLIENT_ID: process.env.PROD_CLIENT_ID,
        CLIENT_SECRET: process.env.PROD_CLIENT_SECRET,
        REDIRECT_URI: process.env.PROD_REDIRECT_URI,
      }
    : {
        CLIENT_ID: process.env.DEV_CLIENT_ID,
        CLIENT_SECRET: process.env.DEV_CLIENT_SECRET,
        REDIRECT_URI: process.env.DEV_REDIRECT_URI,
      };
