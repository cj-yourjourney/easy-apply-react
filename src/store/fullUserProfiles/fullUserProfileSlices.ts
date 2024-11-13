import { FullUserProfile } from "../../types/fullUserProfileTypes";
import createGenericSlice from "../../utils/redux/SliceUtils";
import { fetchUserFullProfile } from './fullUserProfileThunks'
// Initial state for the profile
const initialState = {
  loading: false,
  error: null,
  success: false,
  profile: null as FullUserProfile | null 
}

export const fullUserProfileSlice = createGenericSlice({
  name: 'profile',
  initialState,
  thunk: fetchUserFullProfile
})

