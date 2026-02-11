import type { Config } from 'prettier'
import type { PrettierPluginOrganizeAttributesParserOptions as OrganizeAttributesConfig } from 'prettier-plugin-organize-attributes'

const config: Config & OrganizeAttributesConfig = {
  arrowParens: 'avoid',
  bracketSameLine: true,
  bracketSpacing: true,
  checkIgnorePragma: true,
  embeddedLanguageFormatting: 'auto',
  htmlWhitespaceSensitivity: 'css',
  jsxSingleQuote: true,
  objectWrap: 'collapse',
  plugins: ['prettier-plugin-organize-attributes'],
  printWidth: 95,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  semi: false,
  singleAttributePerLine: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none',
  vueIndentScriptAndStyle: false,
  attributeGroups: [
    '^tabindex$',
    '^(id|name)$',
    '^ref$',
    '^:style$',
    '$CLASS',
    '^:class$',
    '^\[\]$',
    '$DEFAULT',
    '$VUE_ATTRIBUTE',
    '^(:|@)',
    '$DATA',
    '$ARIA',
    '$ROLE'
  ],
  attributeIgnoreCase: false,
  attributeSort: 'ASC'
}

export default config
