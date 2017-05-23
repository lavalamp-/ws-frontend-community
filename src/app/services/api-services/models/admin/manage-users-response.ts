
export interface ManageUsersResponse {
  users: UserData[],
}

export interface UserData {
  uuid: string,
  email: string,
  email_verified: boolean,
  enabled: boolean
}
