import { soduko } from '../main'
import { Items } from './type'

export const X90 = Array(9)
  .fill(0)
  .map((_, i) => i)

export const X91 = X90.map((_, i) => i + 1 + '')

export function getItemsMaybes(Items: Items) {
  return Items.filter((e) => !e.v).flatMap((e) => [...e.maybe])
}
// 多个元素 删除一个maybe
export function itemsDeleteMaybe(items: Items, maybe: string) {
  items.forEach((item) => {
    if (item.maybe.has(maybe)) {
      item.maybe.delete(maybe)
      item.maybeDel.add(maybe)
    }
  })
}

// 两个数组里相同的元素
export function getCommonElement(arr1: any[], arr2: any[]) {
  return arr1.filter((element) => arr2.includes(element))[0] || ''
}
// 两个数组里 某元素的 数量相同
export function isElementCountsSame(ele: string, arr1: any[], arr2: any[]) {
  return arr1.filter((e) => e === ele).length === arr2.filter((e) => e === ele).length
}
export function byRow(row: number) {
  return X90.map((col) => ij2bi([row, col])).map(getByBi)
}
export function byRows() {
  return X90.map(byRow)
}
export function byCol(col: number) {
  return X90.map((row) => ij2bi([row, col])).map(getByBi)
}
export function byCols() {
  return X90.map(byCol)
}
export function byBlocks() {
  return X90.map((i) => soduko[i])
}

export function ij2bi([i, j]: [i: number, j: number]): [number, number] {
  const blockI = Math.floor(i / 3)
  const blockJ = Math.floor(j / 3)
  const blockNumber = blockI * 3 + blockJ
  const blockIndex = (i % 3) * 3 + (j % 3)

  return [blockNumber, blockIndex]
}
export function getByBi([blockNumber, blockIndex]: [blockNumber: number, blockIndex: number]) {
  return soduko[blockNumber][blockIndex]
}
export function bi2ij([blockNumber, blockIndex]: [blockNumber: number, blockIndex: number]) {
  const blockI = Math.floor(blockNumber / 3)
  const blockJ = blockNumber % 3
  const i = blockI * 3 + Math.floor(blockIndex / 3)
  const j = blockJ * 3 + (blockIndex % 3)

  return { i, j }
}
