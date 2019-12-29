import { ToDoService, STORAGE_KEY } from '@/services/ToDoService'
import { LocalStorageService } from '@/services/LocalStorageService'
import { itemsFactory, notDeletedItem, deletedItem } from '../data/ToDoFactory'

describe('ToDoService', () => {
  beforeEach(() => {
    LocalStorageService.clearAllItems()
  })

  it('should save provided items to storage', () => {
    const items = itemsFactory()
    ToDoService.storeAll(items)
    expect(LocalStorageService.getItem(STORAGE_KEY)).toEqual(items)
  })

  it('should fetch all items, included deletes ones', () => {
    const items = itemsFactory()
    LocalStorageService.setItem(STORAGE_KEY, items)
    expect(ToDoService.fetchAllWithDeleted()).toEqual(items)
  })

  it('should fetch only deleted items', () => {
    const items = itemsFactory()
    LocalStorageService.setItem(STORAGE_KEY, items)
    const storedItems = ToDoService.fetchDeleted()

    expect(storedItems).toEqual([deletedItem()]) // the deleted item
  })

  it('should fetch all items, excluding deleted', () => {
    const items = itemsFactory()
    LocalStorageService.setItem(STORAGE_KEY, items)
    const storedItems = ToDoService.fetchAll()

    expect(storedItems).toEqual([notDeletedItem()]) // the not deleted item
  })

  it('should not update anything if item is not found', () => {
    ToDoService.updateItem('not_existing', notDeletedItem())
    expect(LocalStorageService.getItem(STORAGE_KEY)).toEqual(undefined)
  })

  it('should update the provided item, without touching the rest', () => {
    const item = notDeletedItem()
    const item2 = deletedItem()
    LocalStorageService.setItem(STORAGE_KEY, [item, item2])
    ToDoService.updateItem(item.id, {
      ...item,
      content: 'Updated item'
    })
    const items = ToDoService.fetchAllWithDeleted()
    expect(items[0]).toEqual(expect.objectContaining({ content: 'Updated item' }))
    expect(items[1]).toEqual(item2)
  })

  it('should remove an item, without touching the rest', () => {
    const item = notDeletedItem()
    const item2 = deletedItem()
    LocalStorageService.setItem(STORAGE_KEY, [item, item2])
    ToDoService.removeItem(item.id)
    expect(ToDoService.fetchAllWithDeleted()).toEqual([item2])
  })
})
