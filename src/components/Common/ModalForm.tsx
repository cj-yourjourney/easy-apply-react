// src/components/Common/ModalForm.tsx
import React from 'react'
import { Modal, Button } from 'react-bootstrap'

interface ModalFormProps {
  title: string
  show: boolean
  onClose: () => void
  children: React.ReactNode
}

const ModalForm: React.FC<ModalFormProps> = ({
  title,
  show,
  onClose,
  children
}) => (
  <Modal show={show} onHide={onClose}>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{children}</Modal.Body>
  </Modal>
)

export default ModalForm
