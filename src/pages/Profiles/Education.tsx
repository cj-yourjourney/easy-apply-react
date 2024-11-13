import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import EducationForm from '../../components/Forms/Profiles/EducationForm'
import FormContainer from '../../components/Forms/FormContainer'
import StatusDisplay from '../../components/Common/StatusDisplay'
import CustomButton from '../../components/Common/Button'
import { createUserEducations } from '../../store/educations/educationThunks'
import useFormArray from '../../utils/hooks/useFormArray'
import { initialEducation } from '../../components/Forms/Profiles/EducationForm'
import { formatEducationsData } from '../../utils/profile/educationUtils'
import { handleNextPage } from '../../utils/navigation/navigationHelpers'
import { useNavigate } from 'react-router-dom'

const EducationPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const educationState = useSelector(
    (state: RootState) => state.educationCreate
  )
  const navigate = useNavigate()

  const {
    formArray: educations,
    handleItemChange,
    handleAddItem,
    handleRemoveItem
  } = useFormArray(initialEducation)

  const [redirectAfterSuccess, setRedirectAfterSuccess] = useState(false)

  // Function to handle submission
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formattedEducations = formatEducationsData(educations)
      dispatch(createUserEducations({ educations: formattedEducations }))
      setRedirectAfterSuccess(false) // Reset redirect state
    },
    [educations, dispatch]
  )

  // Effect to handle redirection after successful submission
  useEffect(() => {
    if (
      educationState.educations &&
      educationState.educations.length > 0 &&
      !educationState.loading
    ) {
      // Show success message
      setRedirectAfterSuccess(true)

      // Redirect after 2 seconds
      const timer = setTimeout(() => {
        handleNextPage('/educations/', true, navigate)
      }, 2000)

      // Clear timer on component unmount
      return () => clearTimeout(timer)
    }
  }, [educationState, navigate])

  return (
    <FormContainer>
      <h1>User Education</h1>
      <StatusDisplay
        loading={educationState.loading}
        error={educationState.error}
        successMessage={
          educationState.educations?.length
            ? 'Education saved successfully!'
            : undefined
        }
      />
      <form onSubmit={handleSubmit}>
        {educations.map((education, index) => (
          <EducationForm
            key={index}
            education={education}
            onChange={(e) => {
              // Update the specific field in the education object
              const updatedEducation = {
                ...education,
                [e.target.name]: e.target.value
              }
              handleItemChange(index, updatedEducation) // Now calling handleItemChange with updated object
            }}
            onRemove={() => handleRemoveItem(index)}
          />
        ))}

        <CustomButton type="button" onClick={handleAddItem}>
          Add Another Education
        </CustomButton>

        <CustomButton type="submit">Submit Education</CustomButton>
      </form>
    </FormContainer>
  )
}

export default EducationPage
