<script setup lang="ts">
import { ref } from 'vue'
import square from './components/square.vue'
import { Item, Items } from './components/type'
import {
  X90,
  byBlocks,
  byCol,
  byCols,
  byRow,
  byRows,
  getCommonElement,
  getItemsMaybes,
  ij2bi,
  isElementCountsSame,
  itemsDeleteMaybe,
} from './components/utils'
import { soduko } from './main'

const DEV = true
const updata = ref(0)
const clickValue = ref('')

function keys(b: number, i: number, key: string) {
  const currentValue = soduko[b][i].v

  if (key === 'Backspace') {
    if (currentValue) {
      mutationNum(currentValue, 'add', b, i)
    }
    soduko[b][i].v = ''
  } else {
    if (soduko[b][i].maybe.has(key)) {
      if (currentValue) {
        mutationNum(currentValue, 'add', b, i)
      }
      soduko[b][i].v = key
      mutationNum(key, 'delete', b, i)
    }
  }
  checkAll()
  updata.value++

  function mutationNum(num: string, type: 'delete' | 'add', blk: number, blkIdx: number) {
    const { i, j } = soduko[blk][blkIdx]
    soduko[blk][blkIdx].v = num

    // 同块
    soduko[blk].forEach((e) => {
      mutation(type, e)
    })

    // 同行
    Array(9)
      .fill(0)
      .map((_, idx) => {
        const [q, w] = ij2bi([i, idx])
        mutation(type, soduko[q][w])
      })

    // 同列
    Array(9)
      .fill(0)
      .map((_, idx) => {
        const [q, w] = ij2bi([idx, j])
        mutation(type, soduko[q][w])
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
</script>

<template>
  <div @click="() => (clickValue = '')">{{ updata }}</div>
  <div class="sudoku">
    <div v-for="block of X90" class="block">
      <square
        v-for="item of X90"
        :item="soduko[block][item]"
        @key="(key:string)=>keys(block, item, key)"
        :clickValue="clickValue"
        @clickX="(e:string) => clickValue = clickValue=== e ? '' : e"
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
.block {
  width: 33.33%;
  border: 1px solid red;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
</style>
