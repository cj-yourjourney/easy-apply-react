// src/store/education/educationThunks.ts
import createGenericAsyncThunk from '../../utils/redux/ThunkUtils'
import { EducationPayload, EducationResponse } from '../../types/educationTypes'

export const createUserEducations = createGenericAsyncThunk<
  EducationPayload,
  EducationResponse
>('education/createUserEducations', '/api/educations/create/', 'POST')
