import createGenericSlice from '../../utils/redux/SliceUtils'
import { createUserEducations } from './educationThunks'
import { educationInitialState } from '../../types/educationTypes'



export const educationSlice = createGenericSlice({
  name: 'educations',
  initialState: educationInitialState,
  thunk: createUserEducations
})
