type SetState<T> = React.Dispatch<React.SetStateAction<T>>

export const handleInputChange =
  <T extends object>(setState: SetState<T>) =>
  (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

export const handleArrayChange =
  (setState: SetState<string[]>) => (index: number, value: string) => {
    setState((prevState) => {
      const newState = [...prevState]
      newState[index] = value
      return newState
    })
  }
