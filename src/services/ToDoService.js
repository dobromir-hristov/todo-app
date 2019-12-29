import { LocalStorageService } from './LocaStorageService'

export const STORAGE_KEY = 'todoItems'
export const ToDoService = {
  fetchAllWithDeleted () {
    return LocalStorageService.getItem(STORAGE_KEY, [])
  },
  fetchDeleted () {
    return ToDoService.fetchAllWithDeleted().filter(item => item.deletedAt)
  },
  fetchAll () {
    return ToDoService.fetchAllWithDeleted().filter(item => !item.deletedAt)
  },
  updateItem (itemId, payload) {
    const items = ToDoService.fetchAllWithDeleted()
    const index = items.findIndex(i => i.id === itemId)
    items.splice(index, 1, payload)
    ToDoService.storeAll(items)
  },
  removeItem (itemId) {
    const items = ToDoService.fetchAllWithDeleted()
    const index = items.findIndex(i => i.id === itemId)
    items.splice(index, 1)
    ToDoService.storeAll(items)
  },
  storeAll (items) {
    LocalStorageService.setItem(STORAGE_KEY, items)
  }
}
