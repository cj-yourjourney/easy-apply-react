// src/store/profileThunks.ts
import createGenericAsyncThunk from '../../utils/redux/ThunkUtils'
import { Profile } from '../../types/profileTypes'

export const createProfile = createGenericAsyncThunk<Profile, Profile>(
  'profile/create',
  '/api/profile/create/',
  'POST'
)


export const updateUserProfile = createGenericAsyncThunk<
  Profile, // ##### Change the backend that only return the 3 fields
  Profile 
>('profile/updateUserProfile', '/api/profile/update/', 'PUT')