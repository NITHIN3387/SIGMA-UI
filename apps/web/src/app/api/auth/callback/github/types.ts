export interface GitHubTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
}

export interface GitHubUser {
  login: string;
  avatar_url: string;
  message?: string;
}

export interface GitHubEmail {
  email: string;
  primary: boolean;
  verified: boolean;
  message?: string;
}