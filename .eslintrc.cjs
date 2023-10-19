module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "prettier",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "prettier",
    "import",
    "simple-import-sort",
  ],
  rules: {
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true,
      },
    ],
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "no-use-before-define": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spreading": "off",
    "react/prop-types": "off",
    "react/jsx-filename-extension": [
      "warn",
      {
        extensions: [".tsx"],
      },
    ],
    "import/no-unresolved": "error",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        ts: "never",
        tsx: "never",
      },
    ],
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          // Packages. react related packages come first.
          [
            "^react",
            "^@?\\w",
            // Internal packages.
            "^(components|modules|utils)(/.*|$)",
            // Side effect imports.
            "^\\u0000",
            // Parent imports. Put .. last.
            "^\\.\\.(?!/?$)",
            "^\\.\\./?$",
            // Other relative imports. Put same-folder imports and . last.
            "^\\./(?=.*/)(?!/?$)",
            "^\\.(?!/?$)",
            "^\\./?$",
            // Style imports.
            "^.+\\.s?css$",
          ],
        ],
      },
    ],
    "simple-import-sort/exports": "error",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "import/prefer-default-export": "off",
    "no-shadow": "off",
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
};
