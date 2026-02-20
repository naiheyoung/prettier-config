import type { Plugin } from 'prettier'
import { AST } from './types'
import { normalize } from './utils'
import { parsers as tsParsers } from 'prettier/plugins/typescript.js'

const importRegex =
  /^(?:(?:\/\/[^\r\n]*\r?\n)|(?:\/\*(?:(?!\/\*)[\s\S])*?\*\/\r?\n))?import(?!\s+type\b)[\s\S]*?\s+from[ \t]+(?:.+)(?:\/\/[^\r\n]*)?\r?\n?$/gm
const importRegexWithType =
  /^(?:(?:\/\/[^\r\n]*\r?\n)|(?:\/\*(?:(?!\/\*)[\s\S])*?\*\/\r?\n))?import\s+type\s+(?:[\s\S]*?)\s+from[ \t\r\n]+(?:.+)\r?\n?$/gm
const toArrowRegex =
  /\/\/\/[ \t]+toarrow\r?\n[ \t]*(?<isAsync>async[ \t]+)?function[ \t]+(?<fnName>[a-zA-Z_$][\w$]*)[ \t]*\((?<fnParams>[^)]*)\)[ \t]*\{(?<fnContent>[\s\S]*?)^}/gm
const toFunRegex =
  /\/\/\/[ \t]+tofun\r?\n[ \t]*const[ \t]+(?<fnName>[a-zA-Z_$][\w$]*)[ \t]*=[ \t]*(?<isAsync>async[ \t]+)?\((?<fnParams>[^)]*)\)[ \t]*=>[ \t]*\{(?<fnContent>[\s\S]*?)^\}/gm
const SPECIALLINES = ['@ts-nocheck', '@ts-check', '@noformat', '@noprettier']

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

const commandProcess = (text: string) => {
  text = text.replace(toArrowRegex, (_, isAsync, fnName, fnParams, fnContent) => {
    return `const ${fnName} = ${isAsync || ''} (${fnParams}) => {${fnContent}}`
  })
  text = text.replace(toFunRegex, (_, fnName, isAsync, fnParams, fnContent) => {
    return `${isAsync || ''}function ${fnName}(${fnParams}) {${fnContent}}`
  })
  return text
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
        text = commandProcess(text)
        const firstLineRule = new RegExp(`^\/.*((?:${SPECIALLINES.join('|')}).*)\r?\n?`, 'i')
        let specialLine = ''
        // ignored .vue
        if (options.parentParser && options.parentParser !== 'vue') {
          const firstLine = text.match(firstLineRule)
          if (firstLine && firstLine.length > 0) {
            specialLine = firstLine[0]
            text = text.slice(specialLine.length)
          }
        }

        const importTypes: string[] = []
        const imports: string[] = []

        text = text
          .replace(importRegexWithType, t => {
            importTypes.push(t.trim())
            return ''
          })
          .trimEnd()
        text = text
          .replace(importRegex, i => {
            imports.push(i.trim())
            return ''
          })
          .trimEnd()
        text = `${specialLine}${[...importTypes, ...imports].filter(Boolean).join('\n')}\n${text.trimEnd()}`
        return text
      }
    }
  }
}

export default specifiersSort
