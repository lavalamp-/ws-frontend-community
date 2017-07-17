
export interface AuthResponse {
  token: string,
  is_admin: boolean,
  is_authenticated: boolean,
  groups: any[],
  user_uuid: string,
}
