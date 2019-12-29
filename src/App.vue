<template>
  <div id="app">
    <div class="container">
      <the-nav class="has-text-centered" />
      <div class="columns is-centered">
        <div class="column is-5">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheNav from './components/TheNav'

export default {
  components: { TheNav }
}
</script>

<style lang="scss">
@import "assets/styles/app";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $theme--color-secondary;
}

.container {
  padding: 0 $theme--spacing-s;
}
</style>
