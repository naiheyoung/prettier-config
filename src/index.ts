import type { Config } from 'prettier'
import type { PrettierPluginOrganizeAttributesParserOptions as OrganizeAttributesConfig } from 'prettier-plugin-organize-attributes'
import * as organizeAttributes from 'prettier-plugin-organize-attributes'

const config: Config & OrganizeAttributesConfig = {
  arrowParens: 'avoid',
  bracketSameLine: true,
  bracketSpacing: true,
  checkIgnorePragma: true,
  embeddedLanguageFormatting: 'auto',
  htmlWhitespaceSensitivity: 'css',
  jsxSingleQuote: true,
  objectWrap: 'preserve',
  plugins: [organizeAttributes],
  printWidth: 95,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  semi: false,
  singleAttributePerLine: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none',
  vueIndentScriptAndStyle: false,
  attributeGroups: [
    '^(lang|xmlns|charset|rel)$',
    '^tabindex$',
    '^(id|name|content)$',
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
