// src/pages/Signup.tsx
import React, { FormEvent } from 'react'
import { User } from '../types/userTypes'
import { registerUser } from '../store/users/userThunks'
import FormContainer from '../components/Forms/FormContainer'
import Form from '../components/Forms/Form'
import Loader from '../components/Common/Loader'
import Message from '../components/Common/Message'
import { useNavigate } from 'react-router-dom'
import { useForm } from '../utils/hooks/useForm'
import { useAuth } from '../utils/hooks/useAuth'
import { useAppSelector } from '../store/hooks'
import { handleNextPage } from '../utils/navigation/navigationHelpers'

const Signup: React.FC = () => {
const { loading, error } = useAppSelector((state) => state.userRegister)
const profile = useAppSelector((state) => state.profileCreate.profile)
const { formData, handleChange } = useForm<User>({
  username: '',
  email: '',
  password: ''
})
const { handleAuthSubmit } = useAuth()
const navigate = useNavigate()

const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  handleAuthSubmit(
    formData,
    registerUser,
    (payload) => {
      localStorage.setItem('userInfo', JSON.stringify(payload))
      // Use handleNextPage for redirection after signup
      handleNextPage('/signup/', true, navigate) // Redirect to profile-info after successful signup
    },
    (error) => console.error('Error:', error)
  )
}

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {loading && <Loader />}
      {error && <Message variant="error">Error: {error}</Message>}
      <Form
        formType="signup"
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </FormContainer>
  )
}

export default Signup
