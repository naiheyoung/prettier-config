import { AST, AttributeNode, Rule } from './types'

/**
 * get weight based on rules
 */
const getPriority = (s: string, rule: Rule[keyof Rule]): number => {
  if (s in rule) return rule[s]
  if (s.startsWith(':') && ':' in rule) return rule[':']
  return Number.MAX_SAFE_INTEGER
}

const getPriorityByIndex = (s: string, rule: Rule[keyof Rule]): number => {
  const ruleKeys = Object.keys(rule)
  const idx = ruleKeys.indexOf(s)
  if (idx !== -1) return idx
  if (s.startsWith(':') && ':' in rule) {
    const colonIdx = ruleKeys.indexOf(':')
    if (colonIdx !== -1) return colonIdx
  }
  return Number.MAX_SAFE_INTEGER
}

const getPriorityByPrefix = (s: string) => {
  if (s.startsWith('data-')) return 2
  if (s.startsWith('@')) return 1
  return 0
}

/**
 * special character handling
 */
export const normalize = (s: string) => {
  if (s.startsWith(':')) return s.slice(1)
  if (s.startsWith('[') && s.endsWith(']')) return s.slice(1, -1)
  if (s.startsWith('_')) return s.slice(1)
  if (s.startsWith('@')) return s.slice(1)
  if (s.startsWith('data-')) return s.slice(5)
  return s
}

export const toSort = (attrs: AST['attrs'] | any, rule: Rule[keyof Rule]) => {
  if (!attrs || attrs.length <= 0) return

  attrs!.sort((a: AttributeNode, b: AttributeNode) => {
    const aGroup = getPriorityByPrefix(a.name)
    const bGroup = getPriorityByPrefix(b.name)
    if (aGroup !== bGroup) return aGroup - bGroup

    const aWeight = getPriority(a.name, rule)
    const bWeight = getPriority(b.name, rule)
    if (aWeight !== bWeight) return aWeight - bWeight

    const aIdx = getPriorityByIndex(a.name, rule)
    const bIdx = getPriorityByIndex(b.name, rule)
    if (aIdx !== bIdx) return aIdx - bIdx

    return normalize(a.name).toLowerCase().localeCompare(normalize(b.name).toLowerCase())
  })
}

const regex = /^\W*(?<attr>[\w\-\.]+)\W*$/m

export const generateRule = (...attrs: string[]): Record<string, number> => {
  const r: Record<string, number> = {}
  let weight = 0
  attrs.forEach((attr: string) => {
    if (attr.startsWith('^')) {
      r[attr.slice(1)] = weight
      weight++
      return
    }
    if (attr.endsWith('$')) {
      r[attr.slice(0, -1)] = weight
      weight++
      return
    }
    const key = attr.match(regex)!.groups!.attr
    if (!(key in r)) {
      r[key] = weight
      r[`:${key}`] = weight
      weight++
    }
  })
  return r
}

export const mergeObject = (
  target: Record<string, any>,
  ...sources: Record<string, any>[]
): Record<string, any> => {
  const r: Record<string, any> = { ...target }

  for (const source of sources) {
    for (const key in source) {
      if (!Object.hasOwn(target, key)) {
        r[key] = source[key]
      }
    }
  }

  return r
}
