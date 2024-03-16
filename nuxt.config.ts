// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  devServer: {
    host: "0.0.0.0",
    port: 3001,
  },
  runtimeConfig: {
    public: {
      frontUrl:
        process.env.NODE_ENV === 'production'
          ? 'https://dev-why-not-here.o-r.kr'
          : 'http://localhost:3001',
          apiUrl: 'https://whynot-here.o-r.kr'
    }
  },
  app: {
    head: {
      title: "WHY NOT HERE",
      htmlAttrs: {
        lang: "ko",
      },
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1, minimal-ui, viewport-fit=contain, maximum-scale=1, user-scalable=no",
        },
        { hid: "description", name: "description", content: "" },
      ],
      script: [
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      ],
    },
  },
  css: ["~/assets/css/common.css"],
  modules: ["@pinia/nuxt"],
  pinia: {
    autoImports: [
      "defineStore",
    ]
  }
})
