<template>
  <div class="ToDo">
    <div class="title is-4 has-text-centered">
      TODOs
    </div>
    <div class="ToDo__addNew">
      <input
        v-model.trim="newTodo"
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

import { ToDoService } from '@/services/ToDoService'
import TodoItem from '@/components/TodoItem'
import { random } from '@/utils'

const ToDoItemFactory = (content) => ({
  id: random(),
  content,
  createdAt: Date.now(),
  completedAt: null,
  deletedAt: null
})

/**
 * @module ToDo
 */
export default {
  name: 'ToDo',
  components: { TodoItem, Draggable },
  data () {
    return {
      newTodo: '',
      todoItems: []
    }
  },
  mounted () {
    this.fetchToDos()
  },
  methods: {
    fetchToDos () {
      this.todoItems = ToDoService.fetchAll()
    },
    saveTodo () {
      if (!this.newTodo) return
      this.todoItems.push(ToDoItemFactory(this.newTodo))
      this.newTodo = ''
      this.storeItems()
    },
    handleItemChange (item) {
      ToDoService.updateItem(item.id, item)
      this.fetchToDos()
    },
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
