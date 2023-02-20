# eslint-config-overwolf
Overwolf's ESlint [shareable config](http://eslint.org/docs/developer-guide/shareable-configs.html)  
Taking mostly from [standard config](https://github.com/standard/eslint-config-standard) and [Google's config](https://github.com/google/eslint-config-google)

## Installation
```
npm install --save-dev eslint eslint-config-overwolf
```

## Usage
After installing the `eslint-config-overwolf` package add this to your `.eslintrc` file:
```
{
  "extends": "overwolf",
  "rules": {
    // specific rules overrides...
  }
}
```
For more information see the [`extends`](http://eslint.org/docs/user-guide/configuring#extending-configuration-files) section of the [ESLint configuration](http://eslint.org/docs/user-guide/configuring) documentation.

## Resources
### ESlint
- [Rules](https://eslint.org/docs/rules/)
- [Shareable Configs](https://eslint.org/docs/developer-guide/shareable-configs)

### Configs
- [Google](https://github.com/google/eslint-config-google)
- [Standard](https://github.com/standard/eslint-config-standard)
- [Airbnb](https://github.com/airbnb/javascript)
