// src/components/Common/SectionWithHeader.tsx
import React from 'react'
import CustomButton from './Button'

interface SectionWithHeaderProps {
  title: string
  onActionClick?: () => void
  actionLabel?: string
  children: React.ReactNode
}

const SectionWithHeader: React.FC<SectionWithHeaderProps> = ({
  title,
  onActionClick,
  actionLabel,
  children
}) => (
  <div className="mb-4">
    <div className="d-flex align-items-center justify-content-between">
      <h3>{title}</h3>
      {onActionClick && actionLabel && (
        <CustomButton variant="link" onClick={onActionClick}>
          {actionLabel}
        </CustomButton>
      )}
    </div>
    {children}
  </div>
)

export default SectionWithHeader
