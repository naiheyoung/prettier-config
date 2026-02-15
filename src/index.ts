import type { Config } from 'prettier'
import attrsSort from './attribute.sort.plugin'
import specifiersSort from './specifier.sort.plugin'

const config: Config = {
  arrowParens: 'avoid',
  bracketSameLine: true,
  bracketSpacing: true,
  checkIgnorePragma: true,
  embeddedLanguageFormatting: 'auto',
  htmlWhitespaceSensitivity: 'css',
  jsxSingleQuote: true,
  objectWrap: 'preserve',
  plugins: [attrsSort, specifiersSort],
  printWidth: 95,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  semi: false,
  singleAttributePerLine: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none',
  vueIndentScriptAndStyle: false
}

export default config
