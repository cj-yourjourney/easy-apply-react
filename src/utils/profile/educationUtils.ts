export const formatEducationsData = (educations: any[]) => {
  return educations.map((education) => ({
    ...education,
    start_year: Number(education.start_year), // Converts string to number
    end_year: education.end_year ? Number(education.end_year) : null // Handles optional end year
  }))
}
