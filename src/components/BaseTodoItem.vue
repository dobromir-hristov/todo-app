<template>
  <div
    class="BaseTodoItem"
    :class="{ 'BaseTodoItem--completed': item.completedAt }"
  >
    <div class="columns is-vcentered is-mobile">
      <div class="column is-narrow">
        <slot name="checkbox">
          <input
            type="checkbox"
            disabled
            :checked="!!item.completedAt"
          >
        </slot>
      </div>
      <div class="column">
        <slot name="content">
          {{ item.content }}
        </slot>
      </div>
      <div class="column is-narrow">
        <div class="BaseTodoItem__actions">
          <slot name="actions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @module BaseTodoItem
 */
export default {
  name: 'BaseTodoItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
.BaseTodoItem {
  &--completed {
    text-decoration: line-through;
    opacity: .5;
  }

  &__actions {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
