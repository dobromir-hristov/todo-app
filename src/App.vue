<template>
  <div id="app">
    <the-nav />
    <router-view />
  </div>
</template>

<script>
import TheNav from './components/TheNav'

export default {
  components: { TheNav }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $theme--color-secondary;
}

</style>
