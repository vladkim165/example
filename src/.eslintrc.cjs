module.exports = {
  plugins: ['react', 'react-hooks', 'prettier'],
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 6, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  extends: [
    'next/core-web-vitals',
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  rules: {
    '@typescript-eslint/ban-ts-ignore': 'off',

    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",

    'linebreak-style': 'off', // Неправильно работает в Windows.

    'arrow-parens': 'off', // Несовместимо с prettier
    'object-curly-newline': [
      'error',
      {
        consistent: true,
      },
    ], // Несовместимо с prettier
    'no-mixed-operators': 'off', // Несовместимо с prettier
    'arrow-body-style': 'off', // Это - не наш стиль?
    'function-paren-newline': 'off', // Несовместимо с prettier
    'no-plusplus': 'off',
    'space-before-function-paren': 0, // Несовместимо с prettier
    // 'max-len': ['error', 180, 2, {'code':180,  "ignoreTemplateLiterals": true, "ignoreStrings": true, 'ignoreUrls': true }], // airbnb позволяет некоторые пограничные случаи
    'no-console': 'off', // airbnb использует предупреждение
    'no-alert': 'error', // airbnb использует предупреждение

    'no-param-reassign': 'off', // Это - не наш стиль?
    radix: 'off', // parseInt, parseFloat и radix выключены. Мне это не нравится.

    'react/require-default-props': 'off', // airbnb использует уведомление об ошибке
    'react/forbid-prop-types': 'off', // airbnb использует уведомление об ошибке

    'prefer-destructuring': 'off',

    'react/no-find-dom-node': 'off', // Я этого не знаю
    'react/no-did-mount-set-state': 'off',
    'react/no-unused-prop-types': 'off', // Это всё ещё работает нестабильно
    'react/jsx-one-expression-per-line': 'off',

    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['to'],
        // disable required href for <a>. It's not good inside Link/SmartLink in next
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'jsx-a11y/label-has-for': [
      2,
      {
        required: {
          every: ['id'],
        },
      },
    ],
    'prettier/prettier': [
      'warn',
      {
        printWidth: 100,
        useTabs: false,
        tabWidth: 2,
        singleQuote: true,
        trailingComma: 'es5',
        vueIndentScriptAndStyle: true,
      },
      {
        usePrettierrc: true,
      },
    ],
  },
};
