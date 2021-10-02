const bodyParser = require("body-parser");

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt1lisan',
    htmlAttrs: {
      lang: 'tr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: "/css/bootstrap.min.css" },
      { rel: 'stylesheet', href: "/fontawesome/css/all.min.css" },
      { rel: 'stylesheet', href: "/mobile/style.css" },
    ],
    script: [
      {src:"/js/jquery-3.5.1.min.js", mode:"client"},
      {src:"/js/popper.min.js", mode:"client"},
      {src:"/js/bootstrap.js", mode:"client"},
      {src:"/fontawesome/js/all.min.js", mode:"client"}
    ]
  },

  loading: {
    color: 'green',
    height: '7px',
    failedColor: 'red',

  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [

  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: (process.env.URL || "127.0.0.1:5001")+'/api',
    https: true,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  // Server tarafında her zaman ilk çalışacak olan kodlar.
  serverMiddleware: [
    bodyParser.json(),
    "~/api"
  ],

 /* server: {
    host: '127.0.0.1',
    port: 5001,
  },

  telemetry: false*/
}
