// src/components/UserSkill.tsx
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import UserSkillForm from '../../components/Forms/Profiles/UserSkillForm'
import FormContainer from '../../components/Forms/FormContainer'
import StatusDisplay from '../../components/Common/StatusDisplay'
import { createUserSkills } from '../../store/skills/skillThunks'
import useFormSkills from '../../utils/hooks/useFormSkills'
import { handleNextPage } from '../../utils/navigation/navigationHelpers'
import { useNavigate } from 'react-router-dom'

const UserSkill: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const skillState = useSelector((state: RootState) => state.skillCreate)
  const navigate = useNavigate()
  const [isSuccess, setIsSuccess] = useState(false)

  const { skills, handleSkillChange, handleAddSkill } = useFormSkills()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const skillsPayload = { skills }
    console.log(skillsPayload)

    // Dispatch the action
    dispatch(createUserSkills(skillsPayload))
  }

  // Effect to handle navigation after successful submission
  useEffect(() => {
    if (skillState.skills.length > 0 && skillState.success) {
      setIsSuccess(true) // Set success state to true
    } else {
      setIsSuccess(false) // Reset success state if not successful
    }
  }, [skillState]) // Depend on skillState

  // Effect to handle redirection after showing success message
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        handleNextPage('/profile-skills/', true, navigate) // Navigate to the next page
      }, 2000) // Delay for 2 seconds

      return () => clearTimeout(timer) // Cleanup timeout on unmount
    }
  }, [isSuccess, navigate]) // Depend on isSuccess and navigate
  return (
    <FormContainer>
      <h1>User Skills</h1>
      <StatusDisplay
        loading={skillState.loading}
        error={skillState.error}
        successMessage={
          skillState.skills.length > 0
            ? 'Skills saved successfully!'
            : undefined
        }
      />
      <UserSkillForm
        skills={skills}
        onChange={handleSkillChange}
        onAddSkill={handleAddSkill}
        onSubmit={handleSubmit}
      />
    </FormContainer>
  )
}

export default UserSkill
