<template>
  <div class="ToDo">
    <div class="title is-4 has-text-centered">
      TODOs
    </div>
    <div class="ToDo__addNew">
      <input
        v-model.trim="newTodoContent"
        class="input"
        type="text"
        name="new_todo"
        placeholder="Your new TODO"
        @keyup.enter.prevent="saveTodo"
      >
    </div>
    <div class="ToDo__items">
      <draggable
        v-model="todoItems"
        handle=".TodoItem__reorderHandle"
        @end="storeItems"
      >
        <todo-item
          v-for="item in todoItems"
          :key="item.key"
          :item="item"
          @change="handleItemChange"
        />
      </draggable>
    </div>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'

import { random } from '@/utils'
import TodoItem from '@/components/TodoItem'
import { ToDoService } from '@/services/ToDoService'

/**
 * @module ToDo
 */
export default {
  name: 'ToDo',
  components: { TodoItem, Draggable },
  data () {
    return {
      newTodoContent: '',
      todoItems: []
    }
  },
  mounted () {
    this.fetchToDos()
  },
  methods: {
    /**
     * Fetches all the todo items
     */
    fetchToDos () {
      this.todoItems = ToDoService.fetchAll()
    },
    /**
     * Saves a new todo item
     */
    saveTodo () {
      // do nothing if we have no content
      if (!this.newTodoContent) return

      // push a new item to the list
      this.todoItems.push({
        id: random(),
        content: this.newTodoContent,
        createdAt: Date.now(),
        completedAt: null,
        deletedAt: null
      })
      // clear the form input
      this.newTodoContent = ''
      // store the items
      this.storeItems()
    },
    /**
     * Saves the todo item, on each change
     * @param {TodoItem} item
     */
    handleItemChange (item) {
      ToDoService.updateItem(item.id, item)
      this.fetchToDos()
    },
    /**
     * Persists the list of todo items
     */
    storeItems () {
      ToDoService.storeAll(this.todoItems)
    }
  }
}
</script>
<style lang="scss">
.ToDo {
  &__items {
    margin-top: $theme--spacing-l;
  }
}
</style>
