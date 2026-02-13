import type { Config } from 'prettier'
import { AttributeSortConfig } from './types'

const config: Config & AttributeSortConfig = {
  arrowParens: 'avoid',
  bracketSameLine: true,
  bracketSpacing: true,
  checkIgnorePragma: true,
  embeddedLanguageFormatting: 'auto',
  htmlWhitespaceSensitivity: 'css',
  jsxSingleQuote: true,
  objectWrap: 'preserve',
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
