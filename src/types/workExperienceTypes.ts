// src/types/workExperienceTypes.ts
export interface WorkExperience {
  id?: number
  job_title: string
  company_name: string
  start_year: number
  end_year?: number | null 
  job_description: string
}

export interface WorkExperienceState {
  loading: boolean
  success: boolean
  error: string | null
  workExperiences: WorkExperience[] | null
}

export type WorkExperiencePayload = {
  workExperiences: WorkExperience[]
}

export type WorkExperienceResponse = {
  workExperiences: WorkExperience[]
}

export const workExperienceInitialState: WorkExperienceState = {
  loading: false,
  success: false, 
  error: null,
  workExperiences: null
}
