<template>
  <div class="TheNav">
    <router-link :to="{ name: 'todo-list' }" data-testid="TheNav__TodoList">
      Todo List
    </router-link> |
    <router-link :to="{ name: 'recycle-bin' }" data-testid="TheNav__RecycleBin">
      Recycle Bin
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'TheNav'
}
</script>

<style lang="scss" scoped>
.TheNav {
  padding: $theme--spacing-l;

  a {
    font-weight: bold;
    color: $theme--color-secondary;

    &.router-link-exact-active {
      color: $theme--color-main;
    }
  }
}
</style>
