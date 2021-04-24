export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: process.env.npm_package_name || '',
    htmlAttrs: {
      lang: 'ru',
    },
  },

  loading: { color: '#1f6d39' },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/scss/app.scss'],

  styleResources: {
    scss: ['assets/scss/vars.scss', 'assets/scss/mixins.scss'],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/style-resources', '@nuxtjs/svg-sprite', '@nuxtjs/axios'],

  router: {
    middleware: [],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
