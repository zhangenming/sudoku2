<script setup lang="ts">
import { Item, Config, Resolves } from './type'
import { X91 } from './utils'

const props = defineProps<{ item: Item; hoverValue: string; show: Config; resolves: Resolves }>()

function shows(resolveType: string, item: Item, n: string) {
  return {
    [resolveType]:
      props.show[resolveType] &&
      props.resolves
        .filter((e) => e.resolveItem === item && e.resolveType === resolveType)
        .some((e) => e.resolveValue === n),
  }
}
</script>

<template>
  <div class="square" tabindex="1" @keydown="(e) => $emit('key', e.key)">
    <div
      v-if="item.v"
      @mouseenter="() => $emit('hover', item.v)"
      :style="{
        fontSize: '50px',
        backgroundColor: hoverValue == item.v ? '#b0b0cf' : '',
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
        @mouseenter="() => $emit('hover', n)"
        v-for="n of X91"
        :style="{
          opacity: item.maybe.has(n) ? 1 : 0,
          backgroundColor: hoverValue == n ? '#b0b0cf' : '',
        }"
        :class="{
          ...shows('resolveL', item, n),
          ...shows('resolveBlc', item, n),
          ...shows('resolveRow', item, n),
          ...shows('resolveCol', item, n),
          ...shows('resolve1', item, n),
        }"
      >
        {{ n }}
      </div>
    </div>
  </div>
</template>

<style lang="less">
.square {
  padding: 1px;
  aspect-ratio: 1;
  width: 33.33%;
  border: 1px solid #aaa;
  > div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    aspect-ratio: 1;
    height: 100%;
    > div {
      width: 33.33%;
      aspect-ratio: 1;
    }
  }
}

div:has(> [class*='resolve']) {
  border: 5px solid red;
}
[class*='resolve'] {
  color: white;
  background: red;
  font-weight: 900;
}
// block:has(> div > div > .resolveBlc) {
//   border: 5px solid red;
// }
.resolveBlc {
  // outline: 1px solid blue;
  color: white;
  background: red;
  font-weight: 900;
}
.resolveCol {
  border-left: 1px solid red;
  border-right: 1px solid red;
}
.resolve1 {
  text-decoration: line-through;
  background: lightgrey;
}
</style>
