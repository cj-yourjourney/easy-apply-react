import React from 'react'
import SectionCard from '../Common/SectionCard'
import ListDisplay from '../Common/ListDisplay'

interface SkillsListProps {
  skills: string[]
}

const SkillsList: React.FC<SkillsListProps> = ({ skills }) => (
  <SectionCard>
    <ListDisplay
      items={skills}
      renderItem={(skill) => skill}
      emptyMessage="No skills added yet."
    />
  </SectionCard>
)

export default SkillsList
