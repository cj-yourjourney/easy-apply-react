import createGenericSlice from '../../utils/redux/SliceUtils'
import { createUserSkills, updateUserSkills } from './skillThunks'
import {
  skillInitialState,
  SkillsState,
  SkillResponse,
  SkillsPayload
} from '../../types/skillTypes'

export const createSkillsSlice = createGenericSlice<
  SkillsState,
  SkillResponse,
  SkillsPayload
>({
  name: 'skills',
  initialState: skillInitialState,
  thunk: createUserSkills
})

export const updateSkillsSlice = createGenericSlice<
  SkillsState,
  { skills: string[] },
  { skills: string[] }
>({
  name: 'skills',
  initialState: skillInitialState,
  thunk: updateUserSkills
})