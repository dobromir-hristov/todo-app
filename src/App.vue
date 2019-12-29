<template>
  <div id="app">
    <div class="container">
      <the-nav class="text-centered" />
      <router-view />
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
</style>
