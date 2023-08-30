const bodyParser = require("body-parser");
const baseURL = (process.env.URL || 'http://localhost:5001')+'/api';

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
    ],
    script: [
      {src:"/js/jquery-3.5.1.min.js", mode:"client"},
      // {src:"/js/popper.min.js", mode:"client"},
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
    ['@nuxtjs/axios', {baseURL}]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  /*axios: {
    baseURL: baseURL+'/api',
    //browserBaseURL: 'http://localhost:5001/api',
    //https: ( (process.env.HTTPS || false)=='true'? true : false ),
  },*/

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  // Server tarafında her zaman ilk çalışacak olan kodlar.
  serverMiddleware: [
    bodyParser.json(),
    "~/api"
  ],
}
