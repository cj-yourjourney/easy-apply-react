// src/store/workExperience/workExperienceThunks.ts
import createGenericAsyncThunk from '../../utils/redux/ThunkUtils'
import {
  WorkExperiencePayload,
  WorkExperienceResponse
} from '../../types/workExperienceTypes'

export const createWorkExperiences = createGenericAsyncThunk<
  WorkExperiencePayload,
  WorkExperienceResponse
>('workExperiences/create', '/api/work-experiences/create/', 'POST')



export const updateWorkExperiences = createGenericAsyncThunk<
  WorkExperiencePayload,
  WorkExperienceResponse
>('workExperiences/update', '/api/work-experiences/update/', 'PUT')