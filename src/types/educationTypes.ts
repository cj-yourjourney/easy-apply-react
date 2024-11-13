export interface Education {
  id?: number
  school_name: string
  degree: string
  start_year: number | null 
  end_year?: number | null
}

export interface EducationState {
  loading: boolean
  success: boolean
  error: string | null
  educations: Education[] | null
}

export type EducationPayload = {
  educations: Education[]
}

export type EducationResponse = {
  educations: Education[]
}

export const educationInitialState: EducationState = {
  loading: false,
  error: null,
  success: false, 
  educations: null
}