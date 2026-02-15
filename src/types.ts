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

type ColumnLine = {
  column: number
  line: number
}

type Loc = {
  start: ColumnLine
  end: ColumnLine
}

type Comment = {
  type: string
  loc: Loc
  range: number[]
  value: string
}

type Declaration = {
  type: string
  definite: boolean
  id: {
    type: string
    decorators: any[]
    name: string
    optional: boolean
    range: number[]
    loc: Loc
  }
  init: {
    type: string
    async: boolean
    body: {
      type: string
      body: [
        {
          type: string
          expression: {
            type: string
            arguments: [
              {
                type: string
                decorators: any[]
                name: string
                optional: boolean
                range: number[]
                loc: Loc
              }
            ]
            callee: {
              type: string
              computed: boolean
              object: {
                type: string
                decorators: any[]
                name: string
                optional: boolean
                range: number[]
                loc: Loc
              }
              optional: boolean
              property: {
                type: string
                decorators: any[]
                name: string
                optional: boolean
                range: number[]
                loc: Loc
              }
              range: number[]
              loc: Loc
            }
            optional: boolean
            range: number[]
            loc: Loc
          }
          range: number[]
          loc: Loc
        }
      ]
      range: number[]
      loc: Loc
    }
    expression: boolean
    generator: boolean
    id: null
    params: [
      {
        type: string
        decorators: any[]
        name: string
        optional: boolean
        typeAnnotation: {
          type: string
          loc: Loc
          range: number[]
          typeAnnotation: {
            type: string
            range: number[]
            loc: Loc
          }
        }
        range: number[]
        loc: Loc
      }
    ]
    range: number[]
    loc: Loc
  }
  range: number[]
  loc: Loc
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

export type SpecifierNode = {
  type: string
  range: number[]
  sourceType: string
  body: {
    type: string
    attributes: any[]
    importKind: string
    range: number[]
    loc: Loc
    source: {
      type: string
      raw: string
      value: string
      range: number[]
      loc: Loc
    }
    declarations: {}
    specifiers: {
      type: string
      imported: {
        type: string
        decorators: any[]
        name: string
        optional: boolean
        range: number[]
        loc: Loc
      }
      importKind: string
      local: {
        type: string
        decorators: any[]
        name: string
        optional: boolean
        range: number[]
        loc: Loc
      }
      range: number[]
      loc: Loc
    }[]
  }[]
  comments: Comment[]
  loc: Loc
}

export type AST = AttributeNode &
  SpecifierNode & {
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
