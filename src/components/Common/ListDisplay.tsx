// src/components/Common/ListDisplay.tsx
import React from 'react'

interface ListDisplayProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  emptyMessage: string
}

const ListDisplay = <T,>({
  items,
  renderItem,
  emptyMessage
}: ListDisplayProps<T>) => (
  <>
    {items.length > 0 ? (
      <ul>
        {items.map((item, index) => (
          <li key={index}>{renderItem(item, index)}</li>
        ))}
      </ul>
    ) : (
      <p>{emptyMessage}</p>
    )}
  </>
)

export default ListDisplay
