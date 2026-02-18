import type { Plugin } from 'prettier'
import { AST, Rule } from './types'
import { generateRule, toSort, mergeObject, normalize } from './utils'
import { parsers as htmlParsers } from 'prettier/parser-html'

const importRegexWithVue =
  /(?<=<script\b[^>]*>[\s\S]*?)(?:(?:\/\/[^\r\n]*\r?\n)|(?:\/\*(?:(?!\/\*)[\s\S])*?\*\/\r?\n))?import[ \t]+.*?from[ \t]+.+(?=[\s\S]*?<\/script>)/g
const importValuesRegex = /\{([^{}]+)\}/

const defaultRule: Rule = {
  html: {
    lang: 0
  },
  meta: {
    charset: 0,
    name: 1,
    content: 2
  },
  link: {
    rel: 0,
    href: 1,
    type: 2
  },
  script: {
    type: 0,
    setup: 0,
    src: 1,
    lang: 1
  },
  svg: {
    xmlns: 0,
    width: 1,
    height: 2
  },
  other: generateRule('id', 'ref', 'style', 'class', '^:')
}

const matchRule = (tag: string) => {
  return mergeObject({}, defaultRule[tag], defaultRule['other'])
}

const traverse = (node: AST) => {
  if (!node || typeof node !== 'object') return

  if (node.kind === 'root' || node.kind === 'element') {
    const attrs = node.attrs
    if (attrs && attrs.length > 0) {
      toSort(attrs, matchRule(node.name))
    }
    const childs = node.children
    for (const child of childs) {
      if (child.kind === 'element') {
        traverse(child)
      }
    }
  }
}

const attrsSort: Plugin = {
  parsers: {
    html: {
      ...htmlParsers.html,
      parse(text, options) {
        const ast: AST = htmlParsers.html.parse(text, options)
        traverse(ast)
        return ast
      }
    },
    vue: {
      ...htmlParsers.vue,
      parse(text, options) {
        const ast = htmlParsers.vue.parse(text, options)
        traverse(ast)
        return ast
      },
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

export default attrsSort
