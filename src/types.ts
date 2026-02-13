type BaseAST = {
  kind: string
  sourceSpan: SourceSpanNode
}

type FileNode = {
  content: string
}

type StartNode = {
  file: FileNode
  offset: number
  line: number
  col: number
}

type EndNode = StartNode

type SourceSpanNode = {
  start: StartNode
  end: EndNode
  fullStart: StartNode
  details: any
}

type TokenNode = {
  type: number
  parts: Array<string>
  sourceSpan: SourceSpanNode
}

export type AttributeNode = BaseAST & {
  name: string
  value: string
  keySpan: SourceSpanNode
  valueSpan: SourceSpanNode
  valueTokens: TokenNode
  namespace: any
  hasExplicitNamespace: boolean
}

export type AST = AttributeNode & {
  children: Array<AST>
  tokens?: Array<TokenNode>
  attrs?: Array<AttributeNode>
  directives?: Array<any>
  isSelfClosing?: boolean
  startSourceSpan?: SourceSpanNode
  endSourceSpan?: SourceSpanNode
  nameSpan: SourceSpanNode
  isVoid?: boolean
  tagDefinition?: {
    closedByChildren: object
    closedByParent: boolean
    isVoid: boolean
    implicitNamespacePrefix: any
    contentType: number
    ignoreFirstLf: boolean
    preventNamespaceInheritance: boolean
    canSelfClose: boolean
  }
}

export type Rule = Partial<{
  [K in keyof HTMLElementTagNameMap]: Partial<Record<keyof HTMLElementTagNameMap[K], number>> &
    Record<string, number>
}> &
  Record<string, Record<string, number>>
