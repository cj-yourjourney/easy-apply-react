import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { userLoginSlice, userRegisterSlice } from './users/userSlices'
import { profileSlice, updateProfileSlice } from './profiles/profileSlices'
import { createSkillsSlice, updateSkillsSlice } from './skills/skillSlices'
import { workExperienceSlice } from './workExperience/workExperienceSlice'
import { educationSlice } from './educations/educationSlice'
import { fullUserProfileSlice } from './fullUserProfiles/fullUserProfileSlices'
import { workExperienceUpdateSlice } from './workExperience/workExperienceSlice'

const reducer = combineReducers({
  // Login & Signup
  userRegister: userRegisterSlice.reducer,
  userLogin: userLoginSlice.reducer,

  // Create
  profileCreate: profileSlice.reducer,
  skillCreate: createSkillsSlice.reducer,
  workExperienceCreate: workExperienceSlice.reducer,
  educationCreate: educationSlice.reducer,

  // Read
  fullUserProfileDetails: fullUserProfileSlice.reducer,

  // Update
  userProfileUpdate: updateProfileSlice.reducer,
  skillUpdate: updateSkillsSlice.reducer,
  workExperienceUpdate: workExperienceUpdateSlice.reducer

  // Delete
})

const getUserFromLocalStorage = () => {
  const userInfo = localStorage.getItem('userInfo')
  return userInfo ? JSON.parse(userInfo) : null
}

const initialState = {
  userLogin: {
    user: getUserFromLocalStorage(),
    loading: false,
    success: false, 
    error: null
  }
}

export const store = configureStore({
  reducer: reducer,
  preloadedState: initialState
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
