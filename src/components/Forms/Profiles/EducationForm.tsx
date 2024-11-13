import React from 'react'
import Input from '../Input'
import CustomButton from '../../Common/Button'
import { Education } from '../../../types/educationTypes'

interface EducationFormProps {
  education: Education
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemove: () => void
}

const EducationForm: React.FC<EducationFormProps> = React.memo(
  ({ education, onChange, onRemove }) => {
    return (
      <div>
        {['school_name', 'degree', 'start_year', 'end_year'].map((field) => (
          <Input
            key={field}
            id={field}
            name={field}
            type="text"
            label={field.replace('_', ' ').toUpperCase()}
            value={education[field as keyof Education]?.toString() || ''} // Convert to string
            onChange={onChange}
            required={field !== 'end_year'} // Optional end year
          />
        ))}

        <CustomButton type="button" onClick={onRemove}>
          Remove Education
        </CustomButton>
      </div>
    )
  }
)

export const initialEducation: Education = {
  school_name: '',
  degree: '',
  start_year: null,
  end_year: null
}

export default EducationForm
