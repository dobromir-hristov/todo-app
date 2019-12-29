<template>
  <base-todo-item
    class="TodoItem"
    :item="item"
  >
    <template #checkbox>
      <input
        v-model="completedLocal"
        type="checkbox"
        class="checkbox"
      >
    </template>
    <template #content>
      <div
        v-if="!isEditing"
        class="break-all"
        @dblclick="enableEdit"
      >
        {{ item.content }}
      </div>
      <input
        v-if="isEditing"
        ref="editInput"
        v-model="contentLocal"
        type="text"
        class="input"
        @keyup.enter="saveEdit"
        @blur="saveEdit"
        @keyup.esc="stopEdit"
      >
    </template>
    <template #actions>
      <button
        class="TodoItem__delete delete has-background-danger"
        @click.prevent="deleteItem"
      >
        Remove
      </button>
      <div class="TodoItem__reorderHandle">
        <i class="fa fa-bars" />
      </div>
    </template>
  </base-todo-item>
</template>

<script>
import BaseTodoItem from '@/components/BaseTodoItem'

/**
 * @module TodoItem
 */
export default {
  name: 'TodoItem',
  components: { BaseTodoItem },
  props: {
    /**
     *  @type TodoItem
     */
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isEditing: false,
      contentLocal: ''
    }
  },
  computed: {
    completedLocal: {
      /**
       * Transforms the completedAt timestamp to boolean
       */
      get () {
        return !!this.item.completedAt
      },
      /**
       * Converts the completedAt boolean to a timestamp
       * Emits the entire changed item
       * @param {Boolean} value
       */
      set (value) {
        this.emitChange({
          completedAt: value ? Date.now() : null
        })
      }
    }
  },
  methods: {
    /**
     * Deletes a todo item
     */
    deleteItem () {
      this.emitChange({
        deletedAt: Date.now()
      })
    },
    /**
     * Emits the changes to the TODO item up to the parent.
     * @param {Object} updatedItem - the todo item
     */
    emitChange (updatedItem) {
      this.$emit('change', {
        ...this.item,
        ...updatedItem
      })
    },
    /**
     * Starts the editing of a todo item.
     * Focuses the input item immediately
     * @return {Promise<void>}
     */
    async enableEdit () {
      this.contentLocal = this.item.content
      this.isEditing = true
      await this.$nextTick()
      this.$refs.editInput.focus()
    },
    /**
     * Saves the editing changes.
     * If no content is provided, just closes
     */
    saveEdit () {
      if (this.contentLocal) {
        this.emitChange({
          content: this.contentLocal
        })
      }
      this.stopEdit()
    },
    /**
     * Stops the editing, without saving anything
     */
    stopEdit () {
      this.isEditing = false
      this.contentLocal = ''
    }
  }
}
</script>

<style lang='scss' scoped>
.TodoItem {
  &:hover {
    .TodoItem__delete {
      opacity: 1;
    }
  }

  &__delete {
    opacity: 0;
    margin-right: $theme--spacing-s;
  }

  &__reorderHandle {
    &:hover {
      cursor: grab;
    }

    &:active {
      cursor: grabbing;
    }
  }
}
</style>
