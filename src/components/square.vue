<script setup lang="ts">
import { Item } from './type'

defineProps<{ item: Item }>()
</script>

<template>
  <div class="square" tabindex="1" @keydown="(e) => $emit('key', e.key)">
    <div v-if="item.v" class="item" style="font-size: 50px">{{ item.v }}</div>

    <div
      v-else
      class="maybe"
      :style="{
        background: item.maybe.size === 0 ? 'red' : '',
      }"
    >
      <div
        v-for="n of 9"
        :style="{
          opacity: item.maybe.has(n + '') ? 1 : 0,
          color:
            item.maybe.size === 1 || item.resolveRow === n + '' || item.resolveCol === n + ''
              ? 'red'
              : '',
          borderTop: item.resolveRow === n + '' ? '1px solid red' : '',
          borderBottom: item.resolveRow === n + '' ? '1px solid red' : '',
          borderLeft: item.resolveCol === n + '' ? '1px solid red' : '',
          borderRight: item.resolveCol === n + '' ? '1px solid red' : '',
        }"
      >
        {{ n }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.square {
  aspect-ratio: 1;
  width: 33.33%;
  border: 1px solid #aaa;
  box-sizing: border-box;
}
.maybe,
.item {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.maybe > div {
  width: 33.33%;
}
</style>
