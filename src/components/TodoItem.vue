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
        @keyup.esc="cancelEdit"
      >
    </template>
    <template #actions>
      <button
        class="TodoItem__delete delete has-background-danger"
        @click.prevent="remove"
      >
        Remove
      </button>
      <div class="button is-white is-small TodoItem__reorderHandle">
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
    remove () {
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
    async enableEdit () {
      this.contentLocal = this.item.content
      this.isEditing = true
      await this.$nextTick()
      this.$refs.editInput.focus()
    },
    saveEdit () {
      if (this.contentLocal) {
        this.emitChange({
          content: this.contentLocal
        })
      }
      this.isEditing = false
      this.contentLocal = ''
    },
    cancelEdit () {
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
