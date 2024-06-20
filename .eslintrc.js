module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier'],
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'no-inline-comments': 'off',
    'max-len': [
      'error',
      {
        code: 80, // Set to what ever you desire
        tabWidth: 4, // Set to what ever you desire

        /* The two rules below are important, they configure ESLint such that 
           the value you assign to the `"code": 80` field above doesn't apply
           to inline comments. So your inline comment won't get chopped at, or      
           moved if it is too long. Set the following two fields to `true`. */

        ignoreTrailingComments: true,
        ignoreComments: true,
      },
    ],
    'prettier/prettier': '',
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
