import React from 'react'
import SectionCard from '../Common/SectionCard'
import { Profile } from '../../types/profileTypes'

interface ProfileHeaderProps {
  profile: Profile
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile }) => {
  const { first_name, last_name, phone } = profile

  return (
    <SectionCard>
      <h2>{`${first_name} ${last_name}`}</h2>
      <p>Phone: {phone}</p>
    </SectionCard>
  )
}

export default ProfileHeader
