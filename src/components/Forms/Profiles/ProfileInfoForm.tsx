// src/components/ProfileInfoForm.tsx
import React from 'react'
import { Form as BootstrapForm } from 'react-bootstrap'
import Input from '../Input'
import CustomButton from '../../Common/Button'

interface ProfileInfoFormProps {
  profileData: {
    first_name: string
    last_name: string
    phone: string
  }
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  buttonLabel?: string // New prop for dynamic button label
}

const ProfileInfoForm: React.FC<ProfileInfoFormProps> = ({
  profileData,
  onChange,
  onSubmit,
  buttonLabel = 'Create Profile' // Default label if none provided
}) => {
  return (
    <BootstrapForm onSubmit={onSubmit}>
      <Input
        id="first_name"
        name="first_name"
        type="text"
        label="First Name"
        value={profileData.first_name}
        onChange={onChange}
        placeholder="Enter first name"
        required
      />
      <Input
        id="last_name"
        name="last_name"
        type="text"
        label="Last Name"
        value={profileData.last_name}
        onChange={onChange}
        placeholder="Enter last name"
        required
      />
      <Input
        id="phone"
        name="phone"
        type="text"
        label="Phone"
        value={profileData.phone}
        onChange={onChange}
        placeholder="Enter phone number"
      />
      <CustomButton variant="primary" type="submit" className="mt-3">
        {buttonLabel}
      </CustomButton>
    </BootstrapForm>
  )
}

export default ProfileInfoForm
