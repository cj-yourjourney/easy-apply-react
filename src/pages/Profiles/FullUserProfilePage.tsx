// src/pages/Profiles/UserProfilePage.tsx
import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../../store/store'
import { updateUserProfile } from '../../store/profiles/profileThunks'
import { fetchUserFullProfile } from '../../store/fullUserProfiles/fullUserProfileThunks'
import { updateUserSkills } from '../../store/skills/skillThunks'
import {
  handleInputChange,
  handleArrayChange
} from '../../utils/formHandlers/handleInputChange'
import { handleSubmit } from '../../utils/formHandlers/handleSubmit'
import { Container } from 'react-bootstrap'
import ModalForm from '../../components/Common/ModalForm'
import SectionWithHeader from '../../components/Common/SectionWithHeader'
import ProfileHeader from '../../components/ProfileDetails/ProfileHeader'
import SkillsList from '../../components/ProfileDetails/SkillsList'
import WorkExperienceList from '../../components/ProfileDetails/WorkExperienceList'
import EducationList from '../../components/ProfileDetails/EducationList'
import StatusDisplay from '../../components/Common/StatusDisplay'
import ProfileInfoForm from '../../components/Forms/Profiles/ProfileInfoForm'
import UserSkillForm from '../../components/Forms/Profiles/UserSkillForm'
import WorkExperienceForm from '../../components/Forms/Profiles/WorkExperienceForm' // Import your WorkExperienceForm component
import { WorkExperience } from '../../types/workExperienceTypes'
import { updateWorkExperiences } from '../../store/workExperience/workExperienceThunks'
const INITIAL_PROFILE_DATA = { first_name: '', last_name: '', phone: '' }
const INITIAL_SKILLS: string[] = []
const INITIAL_WORK_EXPERIENCES: WorkExperience[] = [] // Initial state for work experiences

const UserProfilePage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.userLogin)
  const { profile, loading, error } = useSelector(
    (state: RootState) => state.fullUserProfileDetails
  )

  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showSkillModal, setShowSkillModal] = useState(false)
  const [showWorkExpModal, setShowWorkExpModal] = useState(false) // State for work experience modal
  const [formData, setFormData] = useState(INITIAL_PROFILE_DATA)
  const [skills, setSkills] = useState(INITIAL_SKILLS)
  const [workExperiences, setWorkExperiences] = useState(
    INITIAL_WORK_EXPERIENCES
  ) // State for work experiences
  const [editingIndex, setEditingIndex] = useState<number | null>(null) // Index of the work experience being edited
  const [editingExperience, setEditingExperience] =
    useState<WorkExperience | null>(null) // The experience being edited

  useEffect(() => {
    if (user?.id) dispatch(fetchUserFullProfile(user.id))
  }, [dispatch, user])

  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name,
        last_name: profile.last_name,
        phone: profile.phone
      })
      setSkills(profile.skills || [])
      setWorkExperiences(profile.work_experiences || []) // Set work experiences from profile
    }
  }, [profile])

  const onProfileChange = useCallback(handleInputChange(setFormData), [])
  const onSkillChange = useCallback(handleArrayChange(setSkills), [])
  const onAddSkill = useCallback(() => setSkills((prev) => [...prev, '']), [])

  const handleWorkExperienceChange = (index: number, value: WorkExperience) => {
    const updatedWorkExperiences = [...workExperiences]
    updatedWorkExperiences[index] = value
    setWorkExperiences(updatedWorkExperiences)
  }

  const handleRemoveWorkExperience = (index: number) => {
    const updatedWorkExperiences = workExperiences.filter((_, i) => i !== index)
    setWorkExperiences(updatedWorkExperiences)
  }

  const onProfileSubmit = (e: React.FormEvent<HTMLFormElement>) =>
    handleSubmit(dispatch, updateUserProfile, formData, user?.id, () =>
      setShowProfileModal(false)
    )

  const onSkillSubmit = (e: React.FormEvent<HTMLFormElement>) =>
    handleSubmit(dispatch, updateUserSkills, { skills }, user?.id, () =>
      setShowSkillModal(false)
    )

  const handleEditWorkExperience = (
    index: number,
    experience: WorkExperience
  ) => {
    setEditingIndex(index)
    setEditingExperience(experience)
    setShowWorkExpModal(true) // Show the work experience modal
  }

  const handleWorkExperienceSubmit = (updatedExperience: WorkExperience) => {
    if (editingIndex !== null) {
      // Update the work experiences in the local state
      handleWorkExperienceChange(editingIndex, updatedExperience)

      // Dispatch the updateWorkExperiences thunk
      dispatch(updateWorkExperiences({ workExperiences: workExperiences }))

      // Close the modal
      setShowWorkExpModal(false)
      setEditingExperience(null)
      setEditingIndex(null)
    }
  }

  if (loading || error) {
    return <StatusDisplay loading={loading} error={error} />
  }

  return (
    <Container className="my-4">
      {profile && (
        <>
          <SectionWithHeader
            title="Profile"
            onActionClick={() => setShowProfileModal(true)}
            actionLabel="Edit Profile"
          >
            <ProfileHeader profile={profile} />
          </SectionWithHeader>

          <SectionWithHeader
            title="Skills"
            onActionClick={() => setShowSkillModal(true)}
            actionLabel="Edit Skills"
          >
            <SkillsList skills={skills} />
          </SectionWithHeader>

          <SectionWithHeader title="Work Experiences">
            <WorkExperienceList
              workExperiences={workExperiences} // Pass the state of work experiences
              onEdit={handleEditWorkExperience} // Updated to pass the edit handler
              onRemove={handleRemoveWorkExperience} // Pass the remove handler
            />
          </SectionWithHeader>

          <SectionWithHeader title="Education">
            <EducationList educations={profile.educations} />
          </SectionWithHeader>
        </>
      )}

      {/* Modals */}
      <ModalForm
        title="Edit Profile"
        show={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      >
        <ProfileInfoForm
          profileData={formData}
          onChange={onProfileChange}
          onSubmit={onProfileSubmit}
          buttonLabel="Save Profile"
        />
      </ModalForm>

      <ModalForm
        title="Edit Skills"
        show={showSkillModal}
        onClose={() => setShowSkillModal(false)}
      >
        <UserSkillForm
          skills={skills}
          onChange={onSkillChange}
          onAddSkill={onAddSkill}
          onSubmit={onSkillSubmit}
        />
      </ModalForm>

      {/* Work Experience Modal */}
      <ModalForm
        title="Edit Work Experience"
        show={showWorkExpModal}
        onClose={() => setShowWorkExpModal(false)}
      >
        {editingExperience && (
          <WorkExperienceForm
            experience={editingExperience}
            onChange={(updatedExperience) =>
              setEditingExperience(updatedExperience)
            } // Update state on change
            onSubmit={() => handleWorkExperienceSubmit(editingExperience)} // Pass submit handler
            onRemove={() => handleRemoveWorkExperience(editingIndex!)} // Pass remove handler
          />
        )}
      </ModalForm>
    </Container>
  )
}

export default UserProfilePage
