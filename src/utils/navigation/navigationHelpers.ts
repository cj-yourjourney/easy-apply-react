import { NavigateFunction } from 'react-router-dom'

interface PageFlowMap {
  [key: string]: string
}

// Define the page flow based on the current path
const pageFlow: PageFlowMap = {
  '/login/': '/profile-info/',
  '/signup/': '/profile-info/',
  '/profile-info/': '/profile-skills/',
  '/profile-skills/': '/educations/',
  '/educations/': '/work-experiences/',
  '/work-experiences/': '/full-user-profile/'
}

export const handleNextPage = (
  currentPagePath: string,
  isSuccessful: boolean,
  navigate: NavigateFunction
) => {
  if (isSuccessful && pageFlow[currentPagePath]) {
    navigate(pageFlow[currentPagePath])
  }
}
