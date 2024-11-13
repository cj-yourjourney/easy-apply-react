import React from 'react'
import SectionCard from '../Common/SectionCard'
import ListDisplay from '../Common/ListDisplay'
import { Education } from '../../types/educationTypes'

interface EducationListProps {
  educations: Education[]
}

const EducationList: React.FC<EducationListProps> = ({ educations }) => (
  <SectionCard>
    <ListDisplay
      items={educations}
      renderItem={(edu) => (
        <>
          {edu.degree} from {edu.school_name} ({edu.start_year} -{' '}
          {edu.end_year ?? 'Present'})
        </>
      )}
      emptyMessage="No education details added yet."
    />
  </SectionCard>
)

export default EducationList
