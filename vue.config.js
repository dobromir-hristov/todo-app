module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/styles/theme.variables.scss";`
      }
    }
  }
}
