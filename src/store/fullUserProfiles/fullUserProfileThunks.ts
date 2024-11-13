import createGenericAsyncThunk from "../../utils/redux/ThunkUtils"
import { FullUserProfile } from "../../types/fullUserProfileTypes"


export const fetchUserFullProfile = createGenericAsyncThunk<{}, FullUserProfile>(
  'profile/fetchUserFullProfile',
  '/api/profile/details/',
  'GET'
)
