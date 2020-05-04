module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        corejs: 3,
      },
    ],
    "@babel/preset-react",
    "react-app",
  ],
  plugins: [
    "styled-components",
    "@babel/plugin-transform-runtime",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-syntax-dynamic-import",
    [
      "import",
      { libraryName: "antd", style: true },
      "ant",
    ],
    [
      "import",
      { libraryName: "antd-mobile", libraryDirectory: "lib" },
      "antd-mobile",
    ],
  ],
  env: {
    production: {
      only: ["app"],
      plugins: [
        "lodash",
        "transform-react-remove-prop-types",
        "@babel/plugin-transform-react-inline-elements",
        "@babel/plugin-transform-react-constant-elements",
      ],
    },
    test: {
      plugins: [
        "@babel/plugin-transform-modules-commonjs",
        "dynamic-import-node",
      ],
    },
  },
};
