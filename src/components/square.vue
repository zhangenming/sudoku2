<script setup lang="ts">
import { Item } from './type'
import { X91 } from './utils'

defineProps<{ item: Item; clickValue: String }>()
</script>

<template>
  <div class="square" tabindex="1" @keydown="(e) => $emit('key', e.key)">
    <div
      v-if="item.v"
      @click="() => $emit('clickX', item.v)"
      :style="{
        fontSize: '50px',
        backgroundColor: clickValue == item.v ? '#b0b0cf' : '',
      }"
    >
      {{ item.v }}
    </div>

    <div
      v-else
      :style="{
        background: item.maybe.size === 0 ? 'red' : '',
      }"
    >
      <div
        @click="() => $emit('clickX', n)"
        v-for="n of X91"
        :style="{
          opacity: item.maybe.has(n) || item.maybeDel.has(n) ? 1 : 0,
          backgroundColor: clickValue == n ? '#b0b0cf' : '',
        }"
        :class="{
          resolveL: item.resolveL === n,
          resolveRow: item.resolveRow === n,
          resolveCol: item.resolveCol === n,
          resolveBlc: item.resolveBlc === n,
          resolve1: item.maybeDel.has(n),
        }"
      >
        {{ n }}
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.square {
  padding: 1px;
  aspect-ratio: 1;
  width: 33.33%;
  border: 1px solid #aaa;
  box-sizing: border-box;
  > div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    > div {
      box-sizing: border-box;
      width: 33.33%;
    }
  }
}
.resolveL {
  color: red;
}
.resolveRow {
  border-top: 1px solid red;
  border-bottom: 1px solid red;
}
.resolveCol {
  border-left: 1px solid red;
  border-right: 1px solid red;
}
.resolveBlc {
  outline: 1px solid blue;
}
.resolve1 {
  text-decoration: line-through;
  background: lightgrey;
}
</style>
