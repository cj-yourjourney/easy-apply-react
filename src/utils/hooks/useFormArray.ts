import { useState } from 'react'

type FormItem = Record<string, any> // Generic type for form items

const useFormArray = <T extends FormItem>(initialItem: T) => {
  const [formArray, setFormArray] = useState<T[]>([initialItem])

  // Updated handleItemChange to accept the full updated item
  const handleItemChange = (index: number, updatedItem: T) => {
    setFormArray((prevArray) => {
      const updatedItems = [...prevArray] // Create a copy of the array
      updatedItems[index] = updatedItem // Replace the entire item at the specified index
      return updatedItems // Return the updated array
    })
  }

  const handleAddItem = () => setFormArray([...formArray, { ...initialItem }]) // Adding a new item

  const handleRemoveItem = (index: number) => {
    setFormArray((prevArray) => prevArray.filter((_, i) => i !== index)) // Remove item by index
  }

  return {
    formArray,
    handleItemChange,
    handleAddItem,
    handleRemoveItem
  }
}

export default useFormArray
