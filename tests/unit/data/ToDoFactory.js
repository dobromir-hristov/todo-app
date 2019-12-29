// A factory to generate todo items

// define a constant created timestamp
export const CREATED_AT_CONSTANT = 1577634367348

export const notDeletedItem = () => ({ id: '1', content: 'notDeleted', deletedAt: null, completedAt: null, createdAt: CREATED_AT_CONSTANT })
export const deletedItem = () => ({ id: '2', content: 'deleted', deletedAt: CREATED_AT_CONSTANT, completedAt: null, createdAt: CREATED_AT_CONSTANT })
export const completedItem = () => ({ id: '3', content: 'completed item', deletedAt: null, completedAt: CREATED_AT_CONSTANT, createdAt: CREATED_AT_CONSTANT })

export const itemsFactory = () => [
  notDeletedItem(),
  deletedItem()
]
