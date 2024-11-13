interface WorkExperience {
  job_title: string
  company_name: string
  start_year: number
  end_year?: number | null | undefined// Allow null for ongoing jobs
  job_description: string
}

interface Education {
  school_name: string
  degree: string
  start_year: number
  end_year?: number | null | undefined // Allow null for ongoing studies
}

// Full Profile Type
export interface FullUserProfile {
  user: number
  first_name: string
  last_name: string
  phone: string
  skills: []
  work_experiences: WorkExperience[]
  educations: Education[]
}
