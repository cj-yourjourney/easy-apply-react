// src/components/ProfileInfo.tsx
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store/store'
import { createProfile } from '../../store/profiles/profileThunks'
import ProfileInfoForm from '../../components/Forms/Profiles/ProfileInfoForm'
import FormContainer from '../../components/Forms/FormContainer'
import StatusDisplay from '../../components/Common/StatusDisplay'
import { useNavigate } from 'react-router-dom'
import { handleNextPage } from '../../utils/navigation/navigationHelpers'

const ProfileInfo: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const profileState = useSelector((state: RootState) => state.profileCreate)

  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    phone: ''
  })

  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(createProfile(profileData)).then(() => {
      handleNextPage('/profile-info/', true, navigate) // Redirect on success
    })
  }

  return (
    <FormContainer>
      <h1>Basic Info</h1>
      <StatusDisplay
        loading={profileState.loading}
        error={profileState.error}
        successMessage={
          profileState.profile ? 'Profile created successfully!' : undefined
        }
      />
      <ProfileInfoForm
        profileData={profileData}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </FormContainer>
  )
}

export default ProfileInfo
