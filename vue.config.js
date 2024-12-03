const { defineConfig } = require("@vue/cli-service");
const path = require("path");

const resolve = (dir) => {
  return path.join(__dirname, dir);
};


module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  devServer: {
    port: "8666",
    proxy: {
      //配置代理
    },
    client: {
      overlay: false,
    },
  },
  productionSourceMap: false,

  // 打包app时放开该配置
  publicPath:  "/" ,
  configureWebpack: (config) => {
    config.devtool = "eval-source-map";
  },
  chainWebpack: (config) => {
    // delete prefetch ,default on
    config.plugins.delete("prefetch");
    // delete preload
    // config.plugins.delete('preload')
    // default title
    config.plugin("html").tap((args) => {
      args[0].title = 'Test';
      return args;
    });

    // svg icon config
    // set svg-sprite-loader
    config.module.rule("svg").exclude.add(resolve("src/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
        lessOptions: {
          /** less-loader 配置 */
          strictMath: true,
          noIeCompat: true,
        },
      })
      .end();
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
    plugins: [
    ],
  },
  css: {
    loaderOptions: {
      // 使用等比适配插件
      // postcss: {
      //   postcssOptions: {
      //     plugins: [postcss],
      //   },
      // },
      scss: {
        // 全局sass变量
        //sass-loader 新版本
        // additionalData: `@import "~@/assets/scss/index.scss";`
      },
      less: {
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: {
            hack: `true; @import "/src/styles/variables.less";`, // 全局less变量注入
          },
        },
      },
    },
  },
});
