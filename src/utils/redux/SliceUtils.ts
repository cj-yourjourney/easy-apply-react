import { createSlice, PayloadAction, AsyncThunk } from '@reduxjs/toolkit'

// Base state that allows dynamic keys
interface BaseState {
  loading: boolean
  success: boolean // Reset success state
  error: string | null
  [key: string]: any // Allow other dynamic fields
}

// Options for creating a generic slice
interface SliceOptions<State extends BaseState, Payload, ThunkArg> {
  name: string // Allow `name` to be any string
  initialState: State
  thunk?: AsyncThunk<Payload, ThunkArg, {}>
  extraReducers?: (builder: any) => void
}

// Generic slice creation function
function createGenericSlice<State extends BaseState, Payload, ThunkArg>({
  name,
  initialState,
  thunk,
  extraReducers
}: SliceOptions<State, Payload, ThunkArg>) {
  return createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      if (thunk) {
        builder
          .addCase(thunk.pending, (state) => {
            state.loading = true
            state.error = null
            state.success = false // Reset success state
          })
          .addCase(thunk.fulfilled, (state, action: PayloadAction<Payload>) => {
            state.loading = false
            state.success = true // Reset success state
            const payload = action.payload as Record<string, any> // Cast payload to a generic object
            if (payload && typeof payload === 'object' && name in payload) {
              ;(state as any)[name] = payload[name] // Use the key in the payload
            } else {
              ;(state as any)[name] = payload // No key in payload, just assign directly
            }
          })
          .addCase(thunk.rejected, (state, action) => {
            state.loading = false
            state.success = false
            state.error =
              (action.payload as { detail?: string })?.detail ||
              action.error.message ||
              'Something went wrong'
          })
      }

      if (extraReducers) {
        extraReducers(builder)
      }
    }
  })
}

export default createGenericSlice
