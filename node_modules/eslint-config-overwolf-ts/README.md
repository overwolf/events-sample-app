
# eslint-config-overwolf-ts
Overwolf's [Typescript ESlint](https://github.com/typescript-eslint/typescript-eslint) [shareable config](http://eslint.org/docs/developer-guide/shareable-configs.html)
Leveraging [Overwolf's ESlint](https://github.com/overwolf/eslint-config-overwolf) shareable config  

## Installation
```
npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-overwolf eslint-config-overwolf-ts eslint-plugin-react
```

## Usage
After installing the `eslint-config-overwolf-ts` package add this to your `.eslintrc` file:
```
{
  "extends": "overwolf-ts",
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

### TypeScript ESlint
- [https://github.com/typescript-eslint/typescript-eslint](https://github.com/typescript-eslint/typescript-eslint)
- [Plugin](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin)
