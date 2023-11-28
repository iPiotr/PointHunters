module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@screens": "./src/screens",
            "@components": "./src/components",
            "@utils": "./src/utils",
            "@hooks": "./src/hooks",
            "@navigation": "./src/navigation",
            "@config": "./src/config",
            "@assets": "./assets",
          },
        },
      ],
    ],
  };
};
