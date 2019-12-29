<template>
  <div id="app">
    <div class="container">
      <div class="app-content">
        <the-nav class="has-text-centered" />
        <router-view />
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
  color: $theme--color-secondary;
  background: linear-gradient(to bottom, #2ebf91, #8360c3);
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.container {
  padding: 0 $theme--spacing-s;
}

.app-content {
  background: $grey-lightest;
  padding: $theme--spacing-m;
  padding-top: 0;
  border-radius: 5px;
  box-shadow: 0 0 30px -5px $theme--color-secondary;
  margin: $theme--spacing-m auto;
  min-height: 300px;

  @include tablet {
    width: 40%;
  }
}
</style>
