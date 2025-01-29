import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

interface ErrorResponseData {
  detail: string
}

// Define constants for the two base URLs
const LOCAL_URL = 'http://127.0.0.1:8000'
const PRODUCTION_URL = 'http://35.167.152.67'

// Toggle between URLs here
const BASE_URL = PRODUCTION_URL // Change to LOCAL_URL for local testing

// Helper to build the full API URL
const getFullUrl = (endpoint: string) => `${BASE_URL}${endpoint}`

const createGenericAsyncThunk = <T, ReturnedType>(
  actionName: string,
  endpoint: string, // Use endpoint instead of full URL
  method: 'POST' | 'GET' | 'PUT' | 'DELETE' = 'POST'
) => {
  return createAsyncThunk<ReturnedType, T>(
    actionName,
    async (payload: T, { rejectWithValue }) => {
      const token = getAuthToken()
      const config = createConfig(token)

      try {
        const url = getFullUrl(endpoint) // Construct full URL dynamically
        const response = await performApiCall(method, url, payload, config)
        return response.data
      } catch (error) {
        return handleError(error, actionName, rejectWithValue)
      }
    }
  )
}

const getAuthToken = (): string => {
  const userInfo = localStorage.getItem('userInfo')
  if (userInfo) {
    const parsedUserInfo = JSON.parse(userInfo)
    return parsedUserInfo.token || ''
  }
  return ''
}

const createConfig = (token: string | null) => ({
  headers: {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  }
})

const performApiCall = async (
  method: string,
  url: string,
  payload: any,
  config: any
) => {
  let response

  if (method === 'GET') {
    response = await axios.get(url, config)
  } else if (method === 'POST') {
    response = await axios.post(url, payload, config)
  } else if (method === 'PUT') {
    response = await axios.put(url, payload, config)
  } else if (method === 'DELETE') {
    response = await axios.delete(url, config)
  } else {
    throw new Error(`Unsupported method: ${method}`)
  }

  return response
}

const handleError = (
  error: unknown,
  actionName: string,
  rejectWithValue: (value: { detail: string }) => any
) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ErrorResponseData>
    if (
      axiosError.response &&
      axiosError.response.data &&
      axiosError.response.data.detail
    ) {
      return rejectWithValue({ detail: axiosError.response.data.detail })
    }
  }
  return rejectWithValue({
    detail: `An error occurred while processing your ${actionName} request.`
  })
}

export default createGenericAsyncThunk
