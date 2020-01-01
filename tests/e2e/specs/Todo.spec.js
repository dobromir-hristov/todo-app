import { STORAGE_KEY } from '../../../src/services/ToDoService'

const toDoItemFactory = (override) => Object.assign({
  id: Date.now(),
  content: 'Some content',
  createdAt: Date.now(),
  completedAt: null,
  deletedAt: null
}, override)

const seedWithItems = win => {
  win.localStorage.setItem(STORAGE_KEY, JSON.stringify([
    toDoItemFactory({ content: 'E2E Inserted item', deletedAt: Date.now() })
  ]))
}

describe('Todo', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('.TodoItem').should('not.exist')
  })

  it('starts without any todo items and allows creating some', () => {
    cy.get('.input').type('New Todo{enter}')

    cy.get('.TodoItem').should('have.length', 1)
  })

  it('allows setting items as completed', () => {
    cy.get('.input').type('New Todo{enter}')
    cy.getByTestId('completeCheckbox').click()
    cy.get('.TodoItem').should('have.class', 'BaseTodoItem--completed')
  })

  it('sends deleted items to the trash', () => {
    // create the item
    cy.get('.input').type('New Todo{enter}')
    // delete the item
    cy.getByTestId('deleteTrigger').click()
    // assert item got deleted
    cy.get('.TodoItem').should('not.exist')
    // go to recycling bin
    cy.getByTestId('TheNav__RecycleBin').click()
    // assert we are on the right place
    cy.url().should('contain', 'recycle-bin')
    // assert the item is there
    cy.get('.RecycledTodoItem').should('have.length', 1)
  })

  it('allows removing items from the trash', () => {
    cy.get('.input').type('New Todo{enter}')
    cy.getByTestId('deleteTrigger').click()
    cy.getByTestId('TheNav__RecycleBin').click()
    cy.getByTestId('removeTrigger').click().then(() => {
      // assert we have no items in the storage
      expect(localStorage.getItem(STORAGE_KEY)).to.eq('[]')
    })
    cy.get('.RecycledTodoItem').should('not.exist')
  })

  it('allows reverting items from the trash', () => {
    // seed item directly, skipping UI. Could make use of ToDoService, if we provide the Storage service.
    cy.visit('/recycle-bin', {
      onBeforeLoad: seedWithItems
    })
    // there should be only one item
    cy.get('.RecycledTodoItem').should('have.length', 1)
    // restore the item
    cy.getByTestId('restoreTrigger').click()
    // go to the todo list page
    cy.getByTestId('TheNav__TodoList').click()
    // assert we only have one
    cy.get('.TodoItem').should('have.length', 1)
  })

  it('persists items state after refresh', () => {
    // create item
    cy.get('.input').type('New Todo{enter}')
    // assert we have only 1
    cy.get('.TodoItem').should('have.length', 1)
    cy.reload()
    // item should still be there
    cy.get('.TodoItem').should('have.length', 1)
  })
})
