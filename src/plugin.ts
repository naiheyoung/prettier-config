import type { Plugin, ParserOptions, Options } from 'prettier'
import { AST, Rule } from './types'
import { parsers as htmlParsers } from 'prettier/parser-html'
import { generateRule, toSort, mergeObject } from './utils'

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
      }
    }
  }
}

export { attrsSort }
