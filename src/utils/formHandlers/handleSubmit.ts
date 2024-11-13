// src/utils/handleSubmit.ts
import { AppDispatch } from "../../store/store"
import { fetchUserFullProfile } from "../../store/fullUserProfiles/fullUserProfileThunks"

export const handleSubmit = async (
  dispatch: AppDispatch,
  updateAction: any,
  data: any,
  userId: string | undefined,
  closeModal: () => void
) => {
  await dispatch(updateAction(data))
  if (userId) {
    dispatch(fetchUserFullProfile(userId))
  }
  closeModal()
}
