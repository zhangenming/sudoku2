<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import { soduko } from './main'
import square from './components/square.vue'
import { Config, Item, Items, Resolves } from './components/type'
import {
  X90,
  allItems,
  allLines,
  byBlocks,
  byCol,
  byCols,
  byRow,
  byRows,
  getCommonElement,
  getItemsMaybes,
  ij2bi,
  isElementCountsSame,
  isHaveSameValue,
  clearArr,
} from './components/utils'

const DEV = true
const updata = ref(0)
const hoverValue = ref('')

function keys(b: number, i: number, key: string) {
  const item = soduko[b][i]
  const currentValue = item.v

  if (key === 'Backspace') {
    if (currentValue) {
      mutationItemValue('add', currentValue, b, i)
    }
    item.v = ''
  } else {
    if (item.maybe.has(key)) {
      if (currentValue) {
        mutationItemValue('add', currentValue, b, i)
      }
      mutationItemValue('delete', key, b, i)
    }
  }

  getAllResolve()
}

function mutationItemValue(type: 'delete' | 'add', val: string, blk: number, blkIdx: number) {
  const item = soduko[blk][blkIdx]
  // if (item.v) debugger
  item.v = val

  // 同块
  soduko[blk].forEach((e) => {
    mutation(type, e)
  })

  // 同行
  Array(9)
    .fill(0)
    .map((_, idx) => {
      const [q, w] = ij2bi([item.i, idx])
      mutation(type, soduko[q][w])
    })

  // 同列
  Array(9)
    .fill(0)
    .map((_, idx) => {
      const [q, w] = ij2bi([idx, item.j])
      mutation(type, soduko[q][w])
    })

  function mutation(type: 'delete' | 'add', ele: Item) {
    ele.maybe[type](val)
  }
}

const resolves: Resolves = []

getAllResolve()
function getAllResolve() {
  clearArr(resolves)

  getResolveL()
  getResolveR()
  getResolve1()
  // getResolve12 // 试错 如果填入其中一个maybe 检查棋盘 如果报错 说明这里不能填这个 排除之

  updata.value++

  function getResolveL() {
    allItems()
      .filter((e) => !e.v)
      .forEach((resolveItem) => {
        const size = resolveItem.maybe.size

        if (size === 1) {
          resolves.push({
            resolveType: 'resolveL',
            resolveItem,
            resolveValue: [...resolveItem.maybe][0],
          })
        }

        if (DEV) {
          if (size === 0) {
            console.log('--0', resolveItem)
          }
        }
      })
  }

  function getResolveR() {
    allLines().forEach((line) => {
      const allMaybes = getItemsMaybes(line)
      const resolveMaybes = allMaybes.filter((e) => allMaybes.filter((ee) => e === ee).length === 1)

      const resolveType = ({ blk: 'resolveBlc', row: 'resolveRow', col: 'resolveCol' } as const)[
        line.type
      ]

      line
        .filter((e) => !e.v)
        .forEach((resolveItem) => {
          const resolveValue = getCommonElement(resolveMaybes, [...resolveItem.maybe])
          if (resolveValue) {
            resolves.push({
              resolveItem,
              resolveType,
              resolveValue,
            })
          }
        })
    })
  }

  function getResolve1() {
    byBlocks().forEach((blk) => {
      const blkMaybes = getItemsMaybes(blk)
      // 2 * 2
      ;[...split3A(blk), ...split3B(blk)].forEach((split, splitIdx) => {
        const splitMaybes = getItemsMaybes(split)
        const line = Math.floor(splitIdx / 3) === 0 ? byRow(split[0].i) : byCol(split[0].j)
        const lineMaybes = getItemsMaybes(line)
        new Set(splitMaybes).forEach((resolveValue) => {
          if (isElementCountsSame(resolveValue, splitMaybes, blkMaybes)) {
            line
              .filter((e) => !split.includes(e))
              .filter((e) => e.maybe.has(resolveValue))
              .forEach((resolveItem) => {
                resolves.push({
                  resolveItem,
                  resolveType: 'resolve1',
                  resolveValue,
                })
              })
          }
          if (isElementCountsSame(resolveValue, splitMaybes, lineMaybes)) {
            blk
              .filter((e) => !split.includes(e))
              .filter((e) => e.maybe.has(resolveValue))
              .forEach((resolveItem) => {
                resolves.push({
                  resolveItem,
                  resolveType: 'resolve1',
                  resolveValue,
                })
              })
          }
        })
      })
    })

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

function applyResolve(items: Resolves) {
  items.forEach(({ resolveType, resolveItem, resolveValue }) => {
    if (resolveType === 'resolve1') {
      resolveItem.maybe.delete(resolveValue)
    } else {
      mutationItemValue('delete', resolveValue, resolveItem.blk, resolveItem.item)
    }
  })

  getAllResolve()
  check()

  function check() {
    allLines().forEach((line) => {
      if (isHaveSameValue(line.filter((e) => e.v).map((e) => e.v))) {
        document.title = 'wrong'
        console.log('wrong', line)
      }
    })
    // todo check maybe
  }
}

const show = ref<Config>({})
</script>

<template>
  <div class="op" @mouseenter="hoverValue = ''">
    <div style="display: none">{{ updata }}</div>

    <div>
      <button
        @click="applyResolve(resolves.filter((e) => e.resolveType === 'resolveL'))"
        @mouseenter="() => (show.resolveL = true)"
        @mouseleave="() => (show.resolveL = false)"
      >
        resolveL {{ resolves.filter((e) => e.resolveType === 'resolveL').length }}
      </button>
    </div>
    <div>
      <button
        @click="applyResolve(resolves.filter((e) => e.resolveType === 'resolveBlc'))"
        @mouseenter="() => (show.resolveBlc = true)"
        @mouseleave="() => (show.resolveBlc = false)"
      >
        resolveBlc {{ resolves.filter((e) => e.resolveType === 'resolveBlc').length }}
      </button>
      <button
        @click="applyResolve(resolves.filter((e) => e.resolveType === 'resolveRow'))"
        @mouseenter="() => (show.resolveRow = true)"
        @mouseleave="() => (show.resolveRow = false)"
      >
        resolveRow {{ resolves.filter((e) => e.resolveType === 'resolveRow').length }}
      </button>
      <button
        @click="applyResolve(resolves.filter((e) => e.resolveType === 'resolveCol'))"
        @mouseenter="() => (show.resolveCol = true)"
        @mouseleave="() => (show.resolveCol = false)"
      >
        resolveCol {{ resolves.filter((e) => e.resolveType === 'resolveCol').length }}
      </button>
    </div>
    <div>
      <button
        @click="applyResolve(resolves.filter((e) => e.resolveType === 'resolve1'))"
        @mouseenter="() => (show.resolve1 = true)"
        @mouseleave="() => (show.resolve1 = false)"
      >
        resolve1 {{ resolves.filter((e) => e.resolveType === 'resolve1').length }}
      </button>
    </div>
  </div>

  <div class="sudoku">
    <block v-for="block of X90">
      <square
        :show="show"
        :resolves="resolves"
        v-for="item of X90"
        :item="soduko[block][item]"
        @key="(key:string)=>keys(block, item, key)"
        :hoverValue="hoverValue"
        @hover="(e:string) => hoverValue = hoverValue=== e ? '' : e"
      />
    </block>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}
.sudoku {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
  max-height: 90vh;
  aspect-ratio: 1;
}
block {
  width: 33.33%;
  border: 1px solid red;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
</style>
