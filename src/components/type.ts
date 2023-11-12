export type Item = {
  v: string

  blk: number
  item: number
  i: number
  j: number

  maybe: Set<string>
  maybeDel: Set<string>
}

export type Items = Item[]
export type Line = Items & { type: 'blk' | 'row' | 'col' }
export type Soduko = Line[]

export type Config = { [s: string]: boolean }

export type Resolves = {
  resolveItem: Item
  resolveType: Resolve
  resolveValue: string
}[]

type Resolve = 'resolveL' | 'resolveRow' | 'resolveCol' | 'resolveBlc' | 'resolve1'
