<template>
  <base-todo-item
    class="RecycledTodoItem"
    :item="item"
  >
    <template #actions>
      <div class="buttons">
        <button
          class="button is-small is-primary"
          title="Restore from Trash"
          @click="$emit('restore', item)"
        >
          <span class="icon">
            <span class="fa fa-history fa-lg" />
          </span>
        </button>
        <button
          class="button is-small is-danger"
          title="Remove from Recycle Bin"
          @click="$emit('remove', item)"
        >
          <span class="icon">
            <span class="fa fa-trash fa-lg" />
          </span>
        </button>
      </div>
    </template>
  </base-todo-item>
</template>

<script>
import BaseTodoItem from '@/components/BaseTodoItem'

/**
 * @module RecycledTodoItem
 */
export default {
  name: 'RecycledTodoItem',
  components: { BaseTodoItem },
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.RecycledTodoItem .buttons {
  flex-wrap: nowrap;
}
</style>
