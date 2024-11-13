import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import WorkExperienceForm from '../../components/Forms/Profiles/WorkExperienceForm'
import FormContainer from '../../components/Forms/FormContainer'
import StatusDisplay from '../../components/Common/StatusDisplay'
import CustomButton from '../../components/Common/Button'
import { createWorkExperiences } from '../../store/workExperience/workExperienceThunks'
import useFormArray from '../../utils/hooks/useFormArray'
import { initialWorkExperience } from '../../components/Forms/Profiles/WorkExperienceForm' // Import initialWorkExperience
import { useNavigate } from 'react-router-dom'
import { handleNextPage } from '../../utils/navigation/navigationHelpers'

const WorkExperience: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const workExperienceState = useSelector(
    (state: RootState) => state.workExperienceCreate
  )

  const {
    formArray: workExperiences,
    handleItemChange,
    handleAddItem,
    handleRemoveItem
  } = useFormArray(initialWorkExperience)

  const [successMessageVisible, setSuccessMessageVisible] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formattedExperiences = workExperiences.map((experience) => ({
      ...experience,
      start_year: Number(experience.start_year),
      end_year: experience.end_year ? Number(experience.end_year) : null // Ensure this is nullable
    }))

    console.log('formattedExperiences: ', {
      workExperiences: formattedExperiences
    })

    // Dispatch the action
    const resultAction = await dispatch(
      createWorkExperiences({ workExperiences: formattedExperiences })
    )

    if (createWorkExperiences.fulfilled.match(resultAction)) {
      // Show success message
      setSuccessMessageVisible(true)
    }
  }

  // Redirect after success message is visible
  useEffect(() => {
    if (successMessageVisible && workExperienceState.workExperiences?.length) {
      const timer = setTimeout(() => {
        handleNextPage('/work-experiences/', true, navigate) // Redirect to the next page
      }, 2000) // Redirect after 2 seconds

      // Cleanup the timer
      return () => clearTimeout(timer)
    }
  }, [successMessageVisible, workExperienceState.workExperiences, navigate])

  return (
    <FormContainer>
      <h1>Work Experiences</h1>
      <StatusDisplay
        loading={workExperienceState.loading}
        error={workExperienceState.error}
        successMessage={
          workExperienceState.workExperiences?.length
            ? 'Work Experiences saved successfully!'
            : undefined
        }
      />
      <form onSubmit={handleSubmit}>
        {workExperiences.map((experience, index) => (
          <WorkExperienceForm
            key={index}
            experience={experience}
            onChange={
              (updatedExperience) => handleItemChange(index, updatedExperience) // Pass the entire updated experience
            }
            onRemove={() => handleRemoveItem(index)}
          />
        ))}

        <CustomButton type="button" onClick={handleAddItem}>
          Add Another Experience
        </CustomButton>

        <CustomButton type="submit">Submit Work Experiences</CustomButton>
      </form>
    </FormContainer>
  )
}

export default WorkExperience
