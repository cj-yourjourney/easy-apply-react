export type Profile = {
  first_name: string
  last_name: string
  phone: string
}

export type ProfileState = {
  profile: Profile | null
  loading: boolean
  success: boolean 
  error: string | null
}

export const profileInitialState: ProfileState = {
  profile: null,
  loading: false,
  success: false, 
  error: null
}
