import { createProfile, updateUserProfile } from './profileThunks'
import createGenericSlice from '../../utils/redux/SliceUtils'
import {
  profileInitialState,
  ProfileState,
  Profile
} from '../../types/profileTypes'

export const profileSlice = createGenericSlice<ProfileState, Profile, Profile>({
  name: 'profile',
  initialState: profileInitialState,
  thunk: createProfile
})


export const updateProfileSlice = createGenericSlice<ProfileState, Profile, Profile>({
  name: 'update/profile',
  initialState: profileInitialState,
  thunk: updateUserProfile, 
})