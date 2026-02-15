import type { Plugin } from 'prettier'
import { AST, Rule } from './types'
import { normalize } from './utils'
import { parsers as tsParsers } from 'prettier/plugins/typescript.js'
import { parsers as htmlParsers } from 'prettier/parser-html'

const importRegex = /^import\s+(?!type).*?\s+from\s+(?:.+)\r?\n?$/gm
const importRegexWithType = /^import[ \t]+type[ \t]+(?:.*?)\s+from[ \t]+(?:.+)\r?\n?$/gm
const importRegexWithVue =
  /(?<=<script\b[^>]*>[\s\S]*?)import[ \t]+.*?from[ \t]+.+(?=[\s\S]*?<\/script>)/g
const importValuesRegex = /\{([^{}]+)\}/
const SPECIALLINES = ['@ts-nocheck', '@ts-check']

const traverse = (node: AST) => {
  node.body.forEach(each => {
    if (each.type !== 'ImportDeclaration') return
    each.specifiers.sort((a, b) => {
      if (a.type !== 'ImportSpecifier' || b.type !== 'ImportSpecifier') return 0
      const aUnderscore = a.imported.name.startsWith('_')
      const bUnderscore = b.imported.name.startsWith('_')
      if (aUnderscore !== bUnderscore) return aUnderscore ? 1 : -1
      if (aUnderscore)
        return normalize(a.imported.name).localeCompare(normalize(b.imported.name))
      return a.imported.name.localeCompare(b.imported.name)
    })
  })
}
const specifiersSort: Plugin = {
  parsers: {
    typescript: {
      ...tsParsers.typescript,
      parse(text, options) {
        const ast = tsParsers.typescript.parse(text, options)
        traverse(ast)
        return ast
      },
      preprocess(text, options) {
        if (tsParsers.typescript.preprocess) {
          text = tsParsers.typescript.preprocess(text, options) as string
        }
        // ignored .vue
        if (options.parentParser && options.parentParser === 'vue') return text
        const firstLineRule = new RegExp(`^\/.*((?:${SPECIALLINES.join('|')}).*)\r?\n?`, 'i')
        let specialLine = ''
        const firstLine = text.match(firstLineRule)
        if (firstLine && firstLine.length > 0) {
          specialLine = firstLine[0]
          text = text.slice(specialLine.length)
        }

        const importTypes: string[] = []
        const imports: string[] = []

        text = text.replace(importRegexWithType, t => {
          importTypes.push(t.trim())
          return ''
        })
        text = text.replace(importRegex, i => {
          imports.push(i.trim())
          return ''
        })
        text = `${specialLine}${[...importTypes, ...imports].filter(Boolean).join('\n')}\n${text.trimEnd()}`
        return text
      }
    },
    vue: {
      ...htmlParsers.vue,
      preprocess(text, options) {
        if (htmlParsers.vue.preprocess) {
          text = htmlParsers.vue.preprocess(text, options) as string
        }
        text = text.replace(importRegexWithVue, i => {
          i = i.replace(importValuesRegex, (_, namedImports: string) => {
            namedImports = namedImports
              .trim()
              .split(',')
              .sort((a, b) => {
                return normalize(a.trim())
                  .toLowerCase()
                  .localeCompare(normalize(b.trim()).toLowerCase())
              })
              .join(',')
            return `{${namedImports}}`
          })
          return i
        })
        return text
      }
    }
  }
}

export default specifiersSort
