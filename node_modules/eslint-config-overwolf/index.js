module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'node': true,
  },
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'rules': {
    // Possible Errors
    'no-cond-assign': ['error', 'always'], // overwolf
    'no-control-regex': 'error', // standard
    'no-dupe-args': 'error', // standard
    'no-dupe-keys': 'error', // standard
    'no-duplicate-case': 'error', // standard
    'no-empty-character-class': 'error', // standard
    'no-ex-assign': 'error', // standard
    'no-func-assign': 'error', // standard
    'no-inner-declarations': ['error', 'functions'], // standard
    'no-invalid-regexp': 'error', // standard
    'no-irregular-whitespace': 'error', // standard + google
    'no-obj-calls': 'error', // standard
    'no-sparse-arrays': 'error', // standard
    'no-unexpected-multiline': 'error', // standard + google
    'no-unreachable': 'warn', // overwolf
    'no-unsafe-finally': 'error', // standard
    'no-unsafe-negation': 'error',
    'use-isnan': 'error',
    'valid-typeof': ['error', { 'requireStringLiterals': true }],

    // Best Practices
    'accessor-pairs': ['off'], // overwolf
    'array-callback-return': ['error', { allowImplicit: true }], // airbnb
    'curly': ['error', 'multi-line', 'consistent'], // standard + google (+ consistent overwolf)
    'dot-location': ['error', 'property'],
    'eqeqeq': ['error', 'always', { 'null': 'ignore' }], // standard + airbnb
    'guard-for-in': 'error', // google
    'no-caller': 'error', // google + standard
    'no-case-declarations': 'error', // airbnb
    'no-else-return': ['error', { allowElseIf: false }], // airbnb + overwolf
    'no-empty-pattern': 'error',
    'no-eval': 'error', // airbnb + standard
    'no-extend-native': 'error', // google
    'no-extra-bind': 'error', // google
    'no-fallthrough': ['error', { 'commentPattern': 'break[\\s\\w]*omitted' }], // overwolf
    'no-floating-decimal': 'error',
    'no-global-assign': 'error',
    'no-implied-eval': 'error',
    'no-invalid-this': 'error',
    'no-iterator': 'error',
    'no-labels': ['error', { 'allowLoop': false, 'allowSwitch': false }],
    'no-loop-func': 'error', // airbnb
    'no-multi-spaces': 'error', // google
    'no-multi-str': 'error', // google
    'no-new-func': 'error', // airbnb + standard
    'no-new-wrappers': 'error', // everyone
    'no-octal': 'error', // octals deprecated
    'no-octal-escape': 'error', // octals deprecated
    'no-proto': 'error',
    'no-redeclare': 'error',
    'no-return-assign': ['error', 'except-parens'],
    'no-return-await': 'error', // overwolf
    'no-self-assign': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-throw-literal': 'error', // google + standard
    'no-unmodified-loop-condition': 'error',
    'no-useless-escape': 'error', // standard + airbnb
    'no-with': 'error', // google
    'prefer-promise-reject-errors': ['error', { 'allowEmptyReject': true }], // overwolf
    'radix': 'error', // airbnb
    'vars-on-top': 'error', // overwolf
    'wrap-iife': ['error', 'any', { 'functionPrototypeMethods': true }],
    'yoda': ['error', 'never'],

    // Variables
    'no-label-var': 'error',
    'no-shadow-restricted-names': 'error',
    'no-undef': 'error', // airbnb + standard
    'no-undef-init': 'error',
    'no-unused-vars': ['error', {
      'vars': 'all',
      'args': 'none',
      'ignoreRestSiblings': true,
    }],

    // Style
    'array-bracket-newline': ['error', 'consistent'], // overwolf
    'array-bracket-spacing': ['error', 'never'], // google + airbnb
    'block-spacing': ['error', 'always'], // airbnb + standard (google says never)
    'brace-style': 'error', // google
    'camelcase': ['error', { 'properties': 'never' }], // all
    'comma-dangle': ['error', 'always-multiline'], // google
    'comma-spacing': ['error', { 'before': false, 'after': true }], // all
    'comma-style': ['error', 'last'], // google + standard
    'computed-property-spacing': ['error', 'never'], // google + airbnb
    'eol-last': 'error', // all
    'func-call-spacing': ['error', 'never'], // all
    'function-call-argument-newline': ['error', 'consistent'],
    'function-paren-newline': ['error', 'multiline-arguments'], // airbnb
    'implicit-arrow-linebreak': ['error', 'beside'], // airbnb
    'indent': [
      'error', 2, {
        SwitchCase: 1,
        VariableDeclarator: 1,
        outerIIFEBody: 1,
        ArrayExpression: 1,
        ObjectExpression: 1,
        ImportDeclaration: 1,
        flatTernaryExpressions: false,
        ignoreComments: false,
        CallExpression: {
          arguments: 1,
        },
        FunctionDeclaration: {
          body: 1,
          parameters: 1,
        },
        FunctionExpression: {
          body: 1,
          parameters: 1,
        },
      },
    ],
    'jsx-quotes': ['off', 'prefer-double'], // airbnb
    'key-spacing': ['error', { 'beforeColon': false, 'afterColon': true }], // all
    'keyword-spacing': ['error', { 'before': true, 'after': true }], // google + standard
    'linebreak-style': 'off', // overwolf
    'lines-between-class-members': [
      'error', 'always', {
        exceptAfterSingleLine: true,
      },
    ], // overwolf (allow grouped members)
    'max-len': [
      'error',
      {
        code: 80,
        tabWidth: 2,
        ignoreUrls: true,
        ignoreComments: true,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        // ignorePattern: '^\\s*import\\s+',
      },
    ], // overwolf
    'new-cap': 'error', // google (standard and airbnb varies)
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 4 }], // airbnb
    'no-array-constructor': 'error', // all
    'no-mixed-spaces-and-tabs': 'error', // google + standard
    'no-multi-assign': ['error'], // airbnb
    'no-multiple-empty-lines': [2, { max: 2 }], // google
    'no-nested-ternary': 'error', // airbnb
    'no-new-object': 'error', // all
    'no-tabs': 'error', // google + standard
    'no-trailing-spaces': 'error', // google + standard
    'no-unneeded-ternary': ['error', { 'defaultAssignment': false }], // standard + airbnb
    'no-whitespace-before-property': 'error', // standard + airbnb
    'nonblock-statement-body-position': ['error', 'beside', { overrides: {} }], // airbnb
    'object-curly-spacing': ['error', 'always'], // standard + airbnb
    'object-property-newline': ['error', {
      'allowMultiplePropertiesPerLine': true,
    }], // standard
    'one-var': [
      'error', {
        var: 'never',
        let: 'never',
        const: 'never',
      },
    ], // google
    'operator-linebreak': ['error', 'after', {
      'overrides': {
        '?': 'before',
        ':': 'before',
      },
    }],
    'padded-blocks': ['error', 'never'], // all
    'padding-line-between-statements': [
      'error',
      { 'blankLine': 'always', 'prev': 'block', 'next': '*' },
      { 'blankLine': 'always', 'prev': 'multiline-block-like', 'next': '*' },
    ], // overwolf
    'quote-props': [
      'error',
      'as-needed',
      { keywords: false, unnecessary: false, numbers: false },
    ], // overwolf
    'quotes': [
      'error',
      'single',
      { 'avoidEscape': true, 'allowTemplateLiterals': true },
    ], // standard
    'semi': ['error', 'always'], // google + airbnb
    'semi-spacing': ['error', { before: false, after: true }], // all
    'semi-style': ['error', 'last'], // airbnb
    'space-before-blocks': ['error', 'always'], // all
    'space-before-function-paren': [
      'error', {
        asyncArrow: 'always',
        anonymous: 'never',
        named: 'never',
      },
    ], // google
    'space-in-parens': ['error', 'never'], // airbnb + standard
    'space-infix-ops': 'error', // airbnb + standard
    'space-unary-ops': ['error', { 'words': true, 'nonwords': false }], // standard + airbnb
    'spaced-comment': ['error', 'always'], // google
    'switch-colon-spacing': ['error', { after: true, before: false }], // google + airbnb
    'template-tag-spacing': ['error', 'never'], // airbnb + standard
    'unicode-bom': ['error', 'never'], // airbnb + standard

    // ES6
    'arrow-parens': ['error', 'always'], // google
    'arrow-spacing': ['error', { 'before': true, 'after': true }],
    'constructor-super': 'error', // all
    'generator-star-spacing': ['error', 'after'], // google
    'no-class-assign': 'error', // airbnb + standard
    'no-confusing-arrow': [
      'error', {
        allowParens: true,
      },
    ], // airbnb
    'no-const-assign': 'error', // airbnb + standard
    'no-dupe-class-members': 'error',
    'no-new-symbol': 'error', // all
    'no-this-before-super': 'error', // all
    'no-useless-computed-key': 'error', // airbnb + standard
    'no-useless-constructor': 'error',
    'no-useless-rename': 'error',
    'no-var': 'error', // google
    'prefer-const': ['warn', { destructuring: 'all' }], // overwolf
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'warn', // overwolf
    'require-yield': 'error', // airbnb
    'rest-spread-spacing': ['error', 'never'], // all
    'symbol-description': 'error', // airbnb + standard
    'template-curly-spacing': ['error', 'never'], // airbnb + standard
    'yield-star-spacing': ['error', 'after'], // google
  },
};
