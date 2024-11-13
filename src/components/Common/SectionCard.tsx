// src/components/Common/SectionCard.tsx
import React from 'react'
import { Card } from 'react-bootstrap'

interface SectionCardProps {
 
  children: React.ReactNode
}

const SectionCard: React.FC<SectionCardProps> = ({  children }) => (
  <Card className="mb-3 p-3">
   
    {children}
  </Card>
)

export default SectionCard
