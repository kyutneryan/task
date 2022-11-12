module.exports = {
  env: {
    es2021: true,
    node: true,
    browser: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'airbnb/hooks', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-native'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'react/jsx-filename-extension': [1, {extensions: ['.js', '.jsx']}],
    'react/prop-types': 0,
    'react/require-default-props': 0,
    'react/forbid-prop-types': 0,
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'import/no-unresolved': 0,
    'react/jsx-props-no-spreading': 0,
    'consistent-return': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'import/prefer-default-export': 0, // remove with mock data
    'no-restricted-syntax': 0, // need to remove after merging codes and discussing with this loop authors
    quotes: [2, 'single', {avoidEscape: true}],
    'no-param-reassign': [
      'error',
      {props: true, ignorePropertyModificationsFor: ['state']},
    ],
    'prettier/prettier': 0,
  },
};
