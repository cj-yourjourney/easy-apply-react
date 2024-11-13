import React from 'react'
import SectionCard from '../Common/SectionCard'
import ListDisplay from '../Common/ListDisplay'
import { WorkExperience } from '../../types/workExperienceTypes'

interface WorkExperienceListProps {
  workExperiences: WorkExperience[]
  onEdit: (index: number, value: WorkExperience) => void // Add onEdit prop
  onRemove: (index: number) => void // Add onRemove prop
}

const WorkExperienceList: React.FC<WorkExperienceListProps> = ({
  workExperiences,
  onEdit, // Destructure onEdit
  onRemove // Destructure onRemove
}) => (
  <SectionCard>
    <ListDisplay
      items={workExperiences}
      renderItem={(
        exp,
        index // Pass index for edit/remove actions
      ) => (
        <div key={index}>
          {exp.job_title} at {exp.company_name} ({exp.start_year} -{' '}
          {exp.end_year ?? 'Present'})<p>{exp.job_description}</p>
          <button onClick={() => onEdit(index, exp)}>Edit</button>{' '}
          {/* Edit button */}
          <button onClick={() => onRemove(index)}>Remove</button>{' '}
          {/* Remove button */}
        </div>
      )}
      emptyMessage="No work experiences added yet."
    />
  </SectionCard>
)

export default WorkExperienceList
