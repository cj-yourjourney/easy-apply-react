import React from 'react'
import Input from '../Input'
import CustomButton from '../../Common/Button'
import { WorkExperience } from '../../../types/workExperienceTypes'

// Define initialWorkExperience
export const initialWorkExperience: WorkExperience = {
  job_title: '',
  company_name: '',
  start_year: 0,
  end_year: null,
  job_description: ''
}

interface WorkExperienceFormProps {
  experience: WorkExperience
  onChange: (updatedExperience: WorkExperience) => void // Accepting entire updated experience
  onRemove: () => void
  onSubmit?: () => void // Make onSubmit optional
}

const WorkExperienceForm: React.FC<WorkExperienceFormProps> = ({
  experience,
  onChange,
  onRemove,
  onSubmit // Include onSubmit in the props
}) => {
  // Input field configurations
  const inputFields = [
    { field: 'job_title', type: 'text' as 'text' | 'number' },
    { field: 'company_name', type: 'text' as 'text' | 'number' },
    { field: 'start_year', type: 'number' as 'text' | 'number' },
    { field: 'end_year', type: 'number' as 'text' | 'number' },
    { field: 'job_description', type: 'text' as 'text' | 'number' }
  ]

  return (
    <div>
      {inputFields.map(({ field, type }) => (
        <Input
          key={field}
          id={field}
          name={field}
          type={type}
          label={field.replace('_', ' ').toUpperCase()}
          value={
            experience[field as keyof WorkExperience] !== undefined &&
            experience[field as keyof WorkExperience] !== null
              ? String(experience[field as keyof WorkExperience])
              : ''
          }
          onChange={(e) => {
            const updatedExperience = { ...experience, [field]: e.target.value } // Update experience
            onChange(updatedExperience) // Call onChange with updated experience
          }}
          required={field !== 'end_year'}
        />
      ))}

      <CustomButton type="button" onClick={onRemove}>
        Remove Experience
      </CustomButton>
      {onSubmit && (
        <CustomButton type="button" onClick={onSubmit}>
          Save Experience
        </CustomButton>
      )}
    </div>
  )
}

export default WorkExperienceForm
