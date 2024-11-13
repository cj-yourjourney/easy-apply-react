// src/components/Common/CustomButton.tsx
import React from 'react'
import { Button as BootstrapButton } from 'react-bootstrap'
import classNames from 'classnames'

interface CustomButtonProps {
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark'
    | 'link'
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  children: React.ReactNode
  className?: string // Add className prop here
}

const CustomButton: React.FC<CustomButtonProps> = ({
  variant = 'primary',
  onClick,
  disabled,
  type = 'button',
  children,
  className // Destructure className
}) => {
  return (
    <BootstrapButton
      variant={variant === 'link' ? 'link' : variant}
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={classNames(className, {
        'p-0 text-decoration-underline': variant === 'link'
      })}
    >
      {children}
    </BootstrapButton>
  )
}

export default CustomButton
