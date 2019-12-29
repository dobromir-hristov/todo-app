import { LocalStorageService } from './LocalStorageService'

/**
 * @typedef TodoItem
 * @property {string} id - id of item
 * @property {string} content - content of todo item
 * @property {number} createdAt - time of creation
 * @property {?number} completedAt - time of completion
 * @property {?number} deletedAt - time of deletion
 */

/**
 * The key under which we are saving Todos in LS
 * @type {string}
 */
export const STORAGE_KEY = 'todoItems'

export const ToDoService = {
  /**
   * Stores all the provided todo items
   * @param {TodoItem[]} items
   */
  storeAll (items) {
    LocalStorageService.setItem(STORAGE_KEY, items)
  },
  /**
   * Fetch all Todo items, even the deleted ones
   * @return {TodoItem[]}
   */
  fetchAllWithDeleted () {
    return LocalStorageService.getItem(STORAGE_KEY, [])
  },
  /**
   * Fetch only the deleted todo items
   * @return {TodoItem[]}
   */
  fetchDeleted () {
    return ToDoService.fetchAllWithDeleted().filter(item => item.deletedAt)
  },
  /**
   * Fetches all todo items. Does not return deleted items.
   * @return {TodoItem[]}
   */
  fetchAll () {
    return ToDoService.fetchAllWithDeleted().filter(item => !item.deletedAt)
  },
  /**
   * Updates a todo item.
   * @param {String} itemId
   * @param {TodoItem} payload
   */
  updateItem (itemId, payload) {
    const items = ToDoService.fetchAllWithDeleted()
    const index = items.findIndex(i => i.id === itemId)
    if (index === -1) return
    items.splice(index, 1, payload)
    ToDoService.storeAll(items)
  },
  /**
   * Remove a todo item from the list
   * @param {string} itemId
   */
  removeItem (itemId) {
    const items = ToDoService.fetchAllWithDeleted()
    const index = items.findIndex(i => i.id === itemId)
    items.splice(index, 1)
    ToDoService.storeAll(items)
  }
}
