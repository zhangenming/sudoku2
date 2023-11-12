<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import square from './components/square.vue'
import { Item, Items } from './components/type'
import { X90, X91 } from './components/utils'

const DEV = true
const updata = ref(0)
const clickValue = ref('')

const d = X90.map(() =>
  X90.map(() => ({
    v: '',
    maybe: new Set(X91),
  })),
)
const data = shallowRef<Items[]>((window as any).game1 && d)
data.value.forEach((blk, blkIdx) => {
  blk.forEach((item, itemIdx) => {
    const { i, j } = bi2ij([blkIdx, itemIdx])
    item.maybeDel = new Set()
    item.blk = blkIdx
    item.item = itemIdx
    item.i = i
    item.j = j
  })
})
;(window as any).data = data

function keys(b: number, i: number, key: string) {
  const currentValue = data.value[b][i].v

  if (key === 'Backspace') {
    if (currentValue) {
      mutationNum(currentValue, 'add', b, i)
    }
    data.value[b][i].v = ''
  } else {
    if (data.value[b][i].maybe.has(key)) {
      if (currentValue) {
        mutationNum(currentValue, 'add', b, i)
      }
      data.value[b][i].v = key
      mutationNum(key, 'delete', b, i)
    }
  }
  checkAll()
  updata.value++

  function mutationNum(num: string, type: 'delete' | 'add', blk: number, blkIdx: number) {
    const { i, j } = data.value[blk][blkIdx]
    data.value[blk][blkIdx].v = num

    // 同块
    data.value[blk].forEach((e) => {
      mutation(type, e)
    })

    // 同行
    Array(9)
      .fill(0)
      .map((_, idx) => {
        const [q, w] = ij2bi([i, idx])
        mutation(type, data.value[q][w])
      })

    // 同列
    Array(9)
      .fill(0)
      .map((_, idx) => {
        const [q, w] = ij2bi([idx, j])
        mutation(type, data.value[q][w])
      })

    function mutation(type: 'delete' | 'add', ele: Item) {
      ele.maybe[type](num)
      if (type === 'delete') {
        ele.maybeDel[type](num)
      }
    }
  }
}

checkAll()
function checkAll() {
  checkL()
  checkR()
  check1()

  function checkL() {
    byBlocks().forEach((blk) => {
      blk.forEach((item) => {
        if (item.maybe.size === 1) {
          item.resolveL = [...item.maybe][0]
        }
        if (DEV) {
          if (!item.v && item.maybe.size === 0) {
            console.log('--0', item)
          }
        }
      })
    })
  }

  function checkR() {
    ;[...byRows(), ...byCols(), ...byBlocks()].map((line, lineIdx) => {
      const allMaybes = getItemsMaybes(line)
      const resolveMaybes = allMaybes.filter((e) => allMaybes.filter((ee) => e === ee).length === 1)
      line.forEach((item) => {
        const type = (['resolveRow', 'resolveCol', 'resolveBlc'] as const)[Math.floor(lineIdx / 9)]
        item[type] = getCommonElement(resolveMaybes, [...item.maybe])
      })
    })
  }

  function check1() {
    byBlocks().forEach((blk) => {
      const blkMaybes = getItemsMaybes(blk)
      // 2 * 2
      ;[...split3A(blk), ...split3B(blk)].forEach((split, splitIdx) => {
        const splitMaybes = getItemsMaybes(split)
        const line = Math.floor(splitIdx / 3) === 0 ? byRow(split[0].i) : byCol(split[0].j)
        const lineMaybes = getItemsMaybes(line)
        new Set(splitMaybes).forEach((e) => {
          if (isElementCountsSame(e, splitMaybes, blkMaybes)) {
            itemsDeleteMaybe(
              line.filter((e) => !split.includes(e)),
              e,
            )
          }
          if (isElementCountsSame(e, splitMaybes, lineMaybes)) {
            itemsDeleteMaybe(
              blk.filter((e) => !split.includes(e)),
              e,
            )
          }
        })
      })
    })

    // byBlocks().forEach((blk) => {
    //   const blkMaybes = getItemsMaybes(blk)
    //   split3A(blk).forEach((split) => {
    //     const row = byRow(split[0].i)
    //     const rowMaybes = getItemsMaybes(row)
    //     const splitMaybes = getItemsMaybes(split)
    //     new Set(splitMaybes).forEach((e) => {
    //       if (isElementCountsSame(e, splitMaybes, blkMaybes)) {
    //         itemsDeleteMaybe(
    //           row.filter((e) => !split.includes(e)),
    //           e,
    //         )
    //       }
    //       if (isElementCountsSame(e, splitMaybes, rowMaybes)) {
    //         itemsDeleteMaybe(
    //           blk.filter((e) => !split.includes(e)),
    //           e,
    //         )
    //       }
    //     })
    //   })
    //   split3B(blk).forEach((split) => {
    //     const col = byCol(split[0].j)
    //     const colMaybes = getItemsMaybes(col)
    //     const splitMaybes = getItemsMaybes(split)
    //     new Set(splitMaybes).forEach((e) => {
    //       if (isElementCountsSame(e, splitMaybes, blkMaybes)) {
    //         itemsDeleteMaybe(
    //           col.filter((e) => !split.includes(e)),
    //           e,
    //         )
    //       }
    //       if (isElementCountsSame(e, splitMaybes, colMaybes)) {
    //         itemsDeleteMaybe(
    //           blk.filter((e) => !split.includes(e)),
    //           e,
    //         )
    //       }
    //     })
    //   })
    // })

    function split3A(blk: Items) {
      return [blk.slice(0, 3), blk.slice(3, 6), blk.slice(6, 9)]
    }
    function split3B(blk: Items) {
      return [
        [blk[0], blk[3], blk[6]],
        [blk[1], blk[4], blk[7]],
        [blk[2], blk[5], blk[8]],
      ]
    }
  }
}

function getItemsMaybes(Items: Items) {
  return Items.filter((e) => !e.v).flatMap((e) => [...e.maybe])
}
// 多个元素 删除一个maybe
function itemsDeleteMaybe(items: Items, maybe: string) {
  items.forEach((item) => {
    if (item.maybe.has(maybe)) {
      item.maybe.delete(maybe)
      item.maybeDel.add(maybe)
    }
  })
}

// 两个数组里相同的元素
function getCommonElement(arr1: any[], arr2: any[]) {
  return arr1.filter((element) => arr2.includes(element))[0] || ''
}
// 两个数组里 某元素的 数量相同
function isElementCountsSame(ele: string, arr1: any[], arr2: any[]) {
  return arr1.filter((e) => e === ele).length === arr2.filter((e) => e === ele).length
}
function byRow(row: number) {
  return X90.map((col) => ij2bi([row, col])).map(getByBi)
}
function byRows() {
  return X90.map(byRow)
}
function byCol(col: number) {
  return X90.map((row) => ij2bi([row, col])).map(getByBi)
}
function byCols() {
  return X90.map(byCol)
}
function byBlocks() {
  return X90.map((i) => data.value[i])
}

function ij2bi([i, j]: [i: number, j: number]): [number, number] {
  const blockI = Math.floor(i / 3)
  const blockJ = Math.floor(j / 3)
  const blockNumber = blockI * 3 + blockJ
  const blockIndex = (i % 3) * 3 + (j % 3)

  return [blockNumber, blockIndex]
}
function getByBi([blockNumber, blockIndex]: [blockNumber: number, blockIndex: number]) {
  return data.value[blockNumber][blockIndex]
}
function bi2ij([blockNumber, blockIndex]: [blockNumber: number, blockIndex: number]) {
  const blockI = Math.floor(blockNumber / 3)
  const blockJ = blockNumber % 3
  const i = blockI * 3 + Math.floor(blockIndex / 3)
  const j = blockJ * 3 + (blockIndex % 3)

  return { i, j }
}
</script>

<template>
  <div @click="() => (clickValue = '')">{{ updata }}</div>
  <div class="sudoku">
    <div v-for="i of 9" class="j">
      <square
        v-for="j of 9"
        :item="data[i - 1][j - 1]"
        @key="(key:string)=>keys(i-1,j-1,key)"
        :clickValue="clickValue"
        @clickX="(e:string) => clickValue=clickValue===e?'':e"
      />
    </div>
  </div>
</template>

<style>
.sudoku {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
  max-height: 90vh;
  aspect-ratio: 1;
}
.j {
  width: 33.33%;
  border: 1px solid red;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
</style>
