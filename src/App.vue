<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import square from './components/square.vue'
import { Item } from './components/type'

const X9 = Array(9)
  .fill(0)
  .map((_, i) => i)

const d = Array(9)
  .fill(0)
  .map(() =>
    Array(9)
      .fill(0)
      .map(() => ({
        v: '',
        maybe: new Set(
          Array(9)
            .fill(0)
            .map((_, i) => i + 1 + ''),
        ),
      })),
  )
const data = shallowRef<Item[][]>((window as any).game2 || d)

const updata = ref(0)
function keys(b: number, i: number, key: string) {
  updata.value++
  check()

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
}
check()
;(window as any).data = data

function check() {
  byRows().map((row) => {
    const allMaybes = row.filter((e) => !e.v).flatMap((e) => [...e.maybe])
    const resolveMaybes = allMaybes.filter((e) => allMaybes.filter((ee) => e === ee).length === 1)
    row.forEach((item) => {
      item.resolveRow = getCommonElement(resolveMaybes, [...item.maybe])
    })
  })

  byCols().map((col) => {
    const allMaybes = col.filter((e) => !e.v).flatMap((e) => [...e.maybe])
    const resolveMaybes = allMaybes.filter((e) => allMaybes.filter((ee) => e === ee).length === 1)
    col.forEach((item) => {
      item.resolveCol = getCommonElement(resolveMaybes, [...item.maybe])
    })
  })
}

// 两个数组里相同的元素
function getCommonElement(arr1: any[], arr2: any[]) {
  return arr1.filter((element) => arr2.includes(element))[0] || ''
}
function mutationNum(num: string, type: 'delete' | 'add', b: number, i: number) {
  data.value[b][i].v = num

  const ij = bi2ij([b, i])

  // 同块
  data.value[b].forEach((e) => {
    mutation(type, e)
  })

  // 同行
  Array(9)
    .fill(0)
    .map((_, idx) => {
      const [q, w] = ij2bi([ij.i, idx])
      mutation(type, data.value[q][w])
    })

  // 同列
  Array(9)
    .fill(0)
    .map((_, idx) => {
      const [q, w] = ij2bi([idx, ij.j])
      mutation(type, data.value[q][w])
    })

  function mutation(type: 'delete' | 'add', ele: Item) {
    ele.maybe[type](num)
  }
}
function byRow(row: number) {
  return X9.map((col) => ij2bi([row, col])).map(getByBi)
}
function byRows() {
  return X9.map(byRow)
}
function byCol(col: number) {
  return X9.map((row) => ij2bi([row, col])).map(getByBi)
}
function byCols() {
  return X9.map(byCol)
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
  {{ updata }}
  <div class="sudoku">
    <div v-for="i of 9" class="j">
      <square
        v-for="j of 9"
        :data-id="j"
        :item="data[i - 1][j - 1]"
        @key="(key:string)=>keys(i-1,j-1,key)"
      />
    </div>
  </div>
</template>

<style scoped>
.sudoku {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
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
