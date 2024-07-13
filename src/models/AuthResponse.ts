export interface AuthResponse {
  accessToken: String;
  refreshToken: String;
  user: {
    id: String;
    email: String;
    isActivated: Boolean;
  };
}
