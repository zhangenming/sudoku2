import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { Item, Soduko } from './components/type'
import { X90, X91, allItems, bi2ij, ij2bi } from './components/utils'
Object.defineProperty(Object.prototype, 'xx', {
  get() {
    console.log(this)
    // if (typeof this === 'function') return this.bind(this)
    return this
  },
})
const game0 = X90.map(() =>
  X90.map(() => ({
    v: '',
    maybe: new Set(X91),
  }))
)

const game1 = [
  [
    {
      v: '2',
      maybe: new Set(['8']),
    },
    {
      v: '',
      maybe: new Set(['6']),
    },
    {
      v: '',
      maybe: new Set(['6', '7']),
    },
    {
      v: '',
      maybe: new Set(['1', '3', '8']),
    },
    {
      v: '5',
      maybe: new Set(['1', '3', '4']),
    },
    {
      v: '',
      maybe: new Set(['1', '4', '7']),
    },
    {
      v: '',
      maybe: new Set(['1', '3', '8', '9']),
    },
    {
      v: '',
      maybe: new Set(['1', '3', '4', '9']),
    },
    {
      v: '',
      maybe: new Set(['1', '4', '9']),
    },
  ],
  [
    {
      v: '1',
      maybe: new Set(['8']),
    },
    {
      v: '3',
      maybe: new Set(['5']),
    },
    {
      v: '4',
      maybe: new Set(['5', '8']),
    },
    {
      v: '',
      maybe: new Set(['2', '8']),
    },
    {
      v: '9',
      maybe: new Set(['2']),
    },
    {
      v: '',
      maybe: new Set(['2', '8']),
    },
    {
      v: '7',
      maybe: new Set(['2', '8']),
    },
    {
      v: '',
      maybe: new Set(['2', '5']),
    },
    {
      v: '6',
      maybe: new Set(['2', '5', '8']),
    },
  ],
  [
    {
      v: '',
      maybe: new Set(['5', '8']),
    },
    {
      v: '',
      maybe: new Set(['5', '8']),
    },
    {
      v: '9',
      maybe: new Set(['7', '8']),
    },
    {
      v: '',
      maybe: new Set(['1', '2', '3', '4', '8']),
    },
    {
      v: '6',
      maybe: new Set(['2', '3', '4', '8']),
    },
    {
      v: '',
      maybe: new Set(['1', '4', '7', '8']),
    },
    {
      v: '',
      maybe: new Set(['1', '2', '3', '4', '5', '8']),
    },
    {
      v: '',
      maybe: new Set(['2', '3', '4', '5', '8']),
    },
    {
      v: '',
      maybe: new Set(['1', '4', '8']),
    },
  ],
  [
    {
      v: '6',
      maybe: new Set(['1', '9']),
    },
    {
      v: '',
      maybe: new Set(['1', '2', '9']),
    },
    {
      v: '3',
      maybe: new Set(['1', '2', '9']),
    },
    {
      v: '4',
      maybe: new Set(['9']),
    },
    {
      v: '7',
      maybe: new Set(['2', '9']),
    },
    {
      v: '',
      maybe: new Set(['2', '9']),
    },
    {
      v: '5',
      maybe: new Set(['1']),
    },
    {
      v: '',
      maybe: new Set(['1', '2']),
    },
    {
      v: '8',
      maybe: new Set(['1', '2']),
    },
  ],
  [
    {
      v: '',
      maybe: new Set(['2', '8', '9']),
    },
    {
      v: '',
      maybe: new Set(['2', '4']),
    },
    {
      v: '',
      maybe: new Set(['1', '2', '8']),
    },
    {
      v: '',
      maybe: new Set(['2', '6', '8', '9']),
    },
    {
      v: '',
      maybe: new Set(['2', '5', '6']),
    },
    {
      v: '',
      maybe: new Set(['2', '5', '8']),
    },
    {
      v: '',
      maybe: new Set(['2', '3']),
    },
    {
      v: '',
      maybe: new Set(['2', '4', '7']),
    },
    {
      v: '',
      maybe: new Set(['1', '2', '3']),
    },
  ],
  [
    {
      v: '7',
      maybe: new Set(['2', '4', '8']),
    },
    {
      v: '',
      maybe: new Set(['2', '4', '8']),
    },
    {
      v: '5',
      maybe: new Set(['4', '8']),
    },
    {
      v: '',
      maybe: new Set(['2', '8']),
    },
    {
      v: '1',
      maybe: new Set(['2', '8']),
    },
    {
      v: '3',
      maybe: new Set(['8']),
    },
    {
      v: '9',
      maybe: new Set(['2', '4']),
    },
    {
      v: '',
      maybe: new Set(['2', '4']),
    },
    {
      v: '6',
      maybe: new Set(['4']),
    },
  ],
  [
    {
      v: '',
      maybe: new Set(['1', '3', '9']),
    },
    {
      v: '',
      maybe: new Set(['1', '2', '3', '4', '6', '9']),
    },
    {
      v: '',
      maybe: new Set(['1', '2', '4', '6', '9']),
    },
    {
      v: '',
      maybe: new Set(['3', '9']),
    },
    {
      v: '8',
      maybe: new Set(['2', '3', '4', '6', '9']),
    },
    {
      v: '',
      maybe: new Set(['2', '4', '5', '6', '9']),
    },
    {
      v: '7',
      maybe: new Set(['1', '3']),
    },
    {
      v: '',
      maybe: new Set(['1', '3', '6']),
    },
    {
      v: '',
      maybe: new Set(['1', '5', '6']),
    },
  ],
  [
    {
      v: '5',
      maybe: new Set(['2', '3', '6']),
    },
    {
      v: '',
      maybe: new Set(['2', '6']),
    },
    {
      v: '7',
      maybe: new Set(['2', '3']),
    },
    {
      v: '',
      maybe: new Set(['2', '3', '6']),
    },
    {
      v: '1',
      maybe: new Set(['2', '6']),
    },
    {
      v: '',
      maybe: new Set(['2', '3']),
    },
    {
      v: '4',
      maybe: new Set(['3', '6']),
    },
    {
      v: '8',
      maybe: new Set(['6']),
    },
    {
      v: '9',
      maybe: new Set(['3']),
    },
  ],
  [
    {
      v: '',
      maybe: new Set(['1', '3', '4', '6', '8']),
    },
    {
      v: '',
      maybe: new Set(['3', '4', '8', '9']),
    },
    {
      v: '',
      maybe: new Set(['1', '4', '8']),
    },
    {
      v: '',
      maybe: new Set(['3', '4', '5', '6']),
    },
    {
      v: '7',
      maybe: new Set(['3', '4', '5', '9']),
    },
    {
      v: '',
      maybe: new Set(['4']),
    },
    {
      v: '',
      maybe: new Set(['1', '3', '5', '6']),
    },
    {
      v: '',
      maybe: new Set(['3', '5']),
    },
    {
      v: '2',
      maybe: new Set(['1']),
    },
  ],
]
const game2 = [
  [
    {
      v: '2',
      maybe: new Set(['8']),
    },
    {
      v: '6',
      maybe: new Set([]),
    },
    {
      v: '7',
      maybe: new Set([]),
    },
    {
      v: '',
      maybe: new Set(['1', '3', '8']),
    },
    {
      v: '5',
      maybe: new Set(['1', '3', '4']),
    },
    {
      v: '',
      maybe: new Set(['1', '4']),
    },
    {
      v: '',
      maybe: new Set(['1', '3', '8', '9']),
    },
    {
      v: '',
      maybe: new Set(['1', '3', '4', '9']),
    },
    {
      v: '',
      maybe: new Set(['1', '4', '9']),
    },
  ],
  [
    {
      v: '1',
      maybe: new Set(['8']),
    },
    {
      v: '3',
      maybe: new Set([]),
    },
    {
      v: '4',
      maybe: new Set(['8']),
    },
    {
      v: '',
      maybe: new Set(['2', '8']),
    },
    {
      v: '9',
      maybe: new Set(['2']),
    },
    {
      v: '',
      maybe: new Set(['2', '8']),
    },
    {
      v: '7',
      maybe: new Set(['2', '8']),
    },
    {
      v: '5',
      maybe: new Set(['2']),
    },
    {
      v: '6',
      maybe: new Set(['2', '8']),
    },
  ],
  [
    {
      v: '',
      maybe: new Set(['5', '8']),
    },
    {
      v: '',
      maybe: new Set(['5', '8']),
    },
    {
      v: '9',
      maybe: new Set(['8']),
    },
    {
      v: '',
      maybe: new Set(['1', '2', '3', '4', '8']),
    },
    {
      v: '6',
      maybe: new Set(['2', '3', '8']),
    },
    {
      v: '7',
      maybe: new Set(['1', '8']),
    },
    {
      v: '',
      maybe: new Set(['1', '2', '3', '4', '8']),
    },
    {
      v: '',
      maybe: new Set(['2', '3', '8']),
    },
    {
      v: '',
      maybe: new Set(['1', '8']),
    },
  ],
  [
    {
      v: '6',
      maybe: new Set(['1', '9']),
    },
    {
      v: '',
      maybe: new Set(['1', '2', '9']),
    },
    {
      v: '3',
      maybe: new Set(['1', '2', '9']),
    },
    {
      v: '4',
      maybe: new Set(['9']),
    },
    {
      v: '7',
      maybe: new Set(['2', '9']),
    },
    {
      v: '',
      maybe: new Set(['2', '9']),
    },
    {
      v: '5',
      maybe: new Set(['1']),
    },
    {
      v: '',
      maybe: new Set(['1', '2']),
    },
    {
      v: '8',
      maybe: new Set(['1', '2']),
    },
  ],
  [
    {
      v: '',
      maybe: new Set(['2', '8', '9']),
    },
    {
      v: '4',
      maybe: new Set(['2']),
    },
    {
      v: '',
      maybe: new Set(['1', '2', '8']),
    },
    {
      v: '',
      maybe: new Set(['2', '6', '8', '9']),
    },
    {
      v: '',
      maybe: new Set(['2', '6']),
    },
    {
      v: '5',
      maybe: new Set(['2', '8']),
    },
    {
      v: '',
      maybe: new Set(['2', '3']),
    },
    {
      v: '7',
      maybe: new Set(['2']),
    },
    {
      v: '',
      maybe: new Set(['1', '2', '3']),
    },
  ],
  [
    {
      v: '7',
      maybe: new Set(['2', '8']),
    },
    {
      v: '',
      maybe: new Set(['2', '8']),
    },
    {
      v: '5',
      maybe: new Set(['8']),
    },
    {
      v: '',
      maybe: new Set(['2', '8']),
    },
    {
      v: '1',
      maybe: new Set(['2', '8']),
    },
    {
      v: '3',
      maybe: new Set(['8']),
    },
    {
      v: '9',
      maybe: new Set(['2']),
    },
    {
      v: '4',
      maybe: new Set(['2']),
    },
    {
      v: '6',
      maybe: new Set([]),
    },
  ],
  [
    {
      v: '',
      maybe: new Set(['1', '3']),
    },
    {
      v: '',
      maybe: new Set(['1', '2', '3', '4']),
    },
    {
      v: '',
      maybe: new Set(['1', '2', '4', '6']),
    },
    {
      v: '',
      maybe: new Set(['3', '9']),
    },
    {
      v: '8',
      maybe: new Set(['2', '3', '9']),
    },
    {
      v: '',
      maybe: new Set(['2', '5', '6', '9']),
    },
    {
      v: '7',
      maybe: new Set(['1', '3']),
    },
    {
      v: '',
      maybe: new Set(['1', '3']),
    },
    {
      v: '',
      maybe: new Set(['1', '5', '6']),
    },
  ],
  [
    {
      v: '5',
      maybe: new Set(['2', '3', '6']),
    },
    {
      v: '',
      maybe: new Set(['2', '6']),
    },
    {
      v: '7',
      maybe: new Set(['2', '3']),
    },
    {
      v: '',
      maybe: new Set(['2', '3', '6']),
    },
    {
      v: '1',
      maybe: new Set(['2', '6']),
    },
    {
      v: '',
      maybe: new Set(['2', '3']),
    },
    {
      v: '4',
      maybe: new Set(['3', '6']),
    },
    {
      v: '8',
      maybe: new Set(['6']),
    },
    {
      v: '9',
      maybe: new Set(['3']),
    },
  ],
  [
    {
      v: '',
      maybe: new Set(['1', '3', '6', '8']),
    },
    {
      v: '9',
      maybe: new Set(['3', '8']),
    },
    {
      v: '',
      maybe: new Set(['1', '8']),
    },
    {
      v: '',
      maybe: new Set(['3', '5', '6']),
    },
    {
      v: '7',
      maybe: new Set(['3', '5']),
    },
    {
      v: '4',
      maybe: new Set([]),
    },
    {
      v: '',
      maybe: new Set(['1', '3', '5', '6']),
    },
    {
      v: '',
      maybe: new Set(['3', '5']),
    },
    {
      v: '2',
      maybe: new Set(['1']),
    },
  ],
]

// 需要用数对法 https://zhuanlan.zhihu.com/p/57127555
const game3 = [
  [
    {
      v: '9',
      maybe: [],
      blk: 0,
      item: 0,
      i: 0,
      j: 0,
    },
    {
      v: '2',
      maybe: [],
      blk: 0,
      item: 1,
      i: 0,
      j: 1,
    },
    {
      v: '1',
      maybe: [],
      blk: 0,
      item: 2,
      i: 0,
      j: 2,
    },
    {
      v: '5',
      maybe: [],
      blk: 0,
      item: 3,
      i: 1,
      j: 0,
    },
    {
      v: '8',
      maybe: [],
      blk: 0,
      item: 4,
      i: 1,
      j: 1,
    },
    {
      v: '6',
      maybe: [],
      blk: 0,
      item: 5,
      i: 1,
      j: 2,
    },
    {
      v: '4',
      maybe: [],
      blk: 0,
      item: 6,
      i: 2,
      j: 0,
    },
    {
      v: '3',
      maybe: [],
      blk: 0,
      item: 7,
      i: 2,
      j: 1,
    },
    {
      v: '7',
      maybe: [],
      blk: 0,
      item: 8,
      i: 2,
      j: 2,
    },
  ],
  [
    {
      v: '4',
      maybe: [],
      blk: 1,
      item: 0,
      i: 0,
      j: 3,
    },
    {
      v: '6',
      maybe: [],
      blk: 1,
      item: 1,
      i: 0,
      j: 4,
    },
    {
      v: '5',
      maybe: [],
      blk: 1,
      item: 2,
      i: 0,
      j: 5,
    },
    {
      v: '',
      maybe: ['1', '3'],
      blk: 1,
      item: 3,
      i: 1,
      j: 3,
    },
    {
      v: '',
      maybe: ['3', '7'],
      blk: 1,
      item: 4,
      i: 1,
      j: 4,
    },
    {
      v: '',
      maybe: ['1', '7'],
      blk: 1,
      item: 5,
      i: 1,
      j: 5,
    },
    {
      v: '',
      maybe: ['8', '9'],
      blk: 1,
      item: 6,
      i: 2,
      j: 3,
    },
    {
      v: '2',
      maybe: [],
      blk: 1,
      item: 7,
      i: 2,
      j: 4,
    },
    {
      v: '',
      maybe: ['8', '9'],
      blk: 1,
      item: 8,
      i: 2,
      j: 5,
    },
  ],
  [
    {
      v: '8',
      maybe: [],
      blk: 2,
      item: 0,
      i: 0,
      j: 6,
    },
    {
      v: '7',
      maybe: [],
      blk: 2,
      item: 1,
      i: 0,
      j: 7,
    },
    {
      v: '3',
      maybe: [],
      blk: 2,
      item: 2,
      i: 0,
      j: 8,
    },
    {
      v: '',
      maybe: ['4', '9'],
      blk: 2,
      item: 3,
      i: 1,
      j: 6,
    },
    {
      v: '2',
      maybe: [],
      blk: 2,
      item: 4,
      i: 1,
      j: 7,
    },
    {
      v: '',
      maybe: ['4', '9'],
      blk: 2,
      item: 5,
      i: 1,
      j: 8,
    },
    {
      v: '5',
      maybe: [],
      blk: 2,
      item: 6,
      i: 2,
      j: 6,
    },
    {
      v: '1',
      maybe: [],
      blk: 2,
      item: 7,
      i: 2,
      j: 7,
    },
    {
      v: '6',
      maybe: [],
      blk: 2,
      item: 8,
      i: 2,
      j: 8,
    },
  ],
  [
    {
      v: '3',
      maybe: ['2'],
      blk: 3,
      item: 0,
      i: 3,
      j: 0,
    },
    {
      v: '',
      maybe: ['4', '5'],
      blk: 3,
      item: 1,
      i: 3,
      j: 1,
    },
    {
      v: '',
      maybe: ['2', '5'],
      blk: 3,
      item: 2,
      i: 3,
      j: 2,
    },
    {
      v: '',
      maybe: ['2', '6', '7'],
      blk: 3,
      item: 3,
      i: 4,
      j: 0,
    },
    {
      v: '',
      maybe: ['4', '6'],
      blk: 3,
      item: 4,
      i: 4,
      j: 1,
    },
    {
      v: '8',
      maybe: ['2'],
      blk: 3,
      item: 5,
      i: 4,
      j: 2,
    },
    {
      v: '',
      maybe: ['6', '7'],
      blk: 3,
      item: 6,
      i: 5,
      j: 0,
    },
    {
      v: '1',
      maybe: ['6'],
      blk: 3,
      item: 7,
      i: 5,
      j: 1,
    },
    {
      v: '9',
      maybe: [],
      blk: 3,
      item: 8,
      i: 5,
      j: 2,
    },
  ],
  [
    {
      v: '7',
      maybe: ['9'],
      blk: 4,
      item: 0,
      i: 3,
      j: 3,
    },
    {
      v: '1',
      maybe: ['4'],
      blk: 4,
      item: 1,
      i: 3,
      j: 4,
    },
    {
      v: '',
      maybe: ['4', '9'],
      blk: 4,
      item: 2,
      i: 3,
      j: 5,
    },
    {
      v: '',
      maybe: ['3', '5', '6', '9'],
      blk: 4,
      item: 3,
      i: 4,
      j: 3,
    },
    {
      v: '',
      maybe: ['3', '4'],
      blk: 4,
      item: 4,
      i: 4,
      j: 4,
    },
    {
      v: '',
      maybe: ['4', '6', '9'],
      blk: 4,
      item: 5,
      i: 4,
      j: 5,
    },
    {
      v: '',
      maybe: ['3', '5', '6'],
      blk: 4,
      item: 6,
      i: 5,
      j: 3,
    },
    {
      v: '8',
      maybe: ['3'],
      blk: 4,
      item: 7,
      i: 5,
      j: 4,
    },
    {
      v: '2',
      maybe: ['6'],
      blk: 4,
      item: 8,
      i: 5,
      j: 5,
    },
  ],
  [
    {
      v: '',
      maybe: ['2', '9'],
      blk: 5,
      item: 0,
      i: 3,
      j: 6,
    },
    {
      v: '6',
      maybe: [],
      blk: 5,
      item: 1,
      i: 3,
      j: 7,
    },
    {
      v: '8',
      maybe: ['2', '9'],
      blk: 5,
      item: 2,
      i: 3,
      j: 8,
    },
    {
      v: '1',
      maybe: ['2', '7', '9'],
      blk: 5,
      item: 3,
      i: 4,
      j: 6,
    },
    {
      v: '',
      maybe: ['3', '5'],
      blk: 5,
      item: 4,
      i: 4,
      j: 7,
    },
    {
      v: '',
      maybe: ['2', '7', '9'],
      blk: 5,
      item: 5,
      i: 4,
      j: 8,
    },
    {
      v: '',
      maybe: ['4', '7'],
      blk: 5,
      item: 6,
      i: 5,
      j: 6,
    },
    {
      v: '',
      maybe: ['3', '5'],
      blk: 5,
      item: 7,
      i: 5,
      j: 7,
    },
    {
      v: '',
      maybe: ['4', '7'],
      blk: 5,
      item: 8,
      i: 5,
      j: 8,
    },
  ],
  [
    {
      v: '',
      maybe: ['1', '2', '6', '8'],
      blk: 6,
      item: 0,
      i: 6,
      j: 0,
    },
    {
      v: '7',
      maybe: ['6'],
      blk: 6,
      item: 1,
      i: 6,
      j: 1,
    },
    {
      v: '3',
      maybe: ['2'],
      blk: 6,
      item: 2,
      i: 6,
      j: 2,
    },
    {
      v: '',
      maybe: ['1', '2', '6', '8'],
      blk: 6,
      item: 3,
      i: 7,
      j: 0,
    },
    {
      v: '',
      maybe: ['5', '6'],
      blk: 6,
      item: 4,
      i: 7,
      j: 1,
    },
    {
      v: '',
      maybe: ['2', '5'],
      blk: 6,
      item: 5,
      i: 7,
      j: 2,
    },
    {
      v: '',
      maybe: ['1', '6'],
      blk: 6,
      item: 6,
      i: 8,
      j: 0,
    },
    {
      v: '9',
      maybe: ['6'],
      blk: 6,
      item: 7,
      i: 8,
      j: 1,
    },
    {
      v: '4',
      maybe: [],
      blk: 6,
      item: 8,
      i: 8,
      j: 2,
    },
  ],
  [
    {
      v: '',
      maybe: ['1', '6', '8'],
      blk: 7,
      item: 0,
      i: 6,
      j: 3,
    },
    {
      v: '9',
      maybe: [],
      blk: 7,
      item: 1,
      i: 6,
      j: 4,
    },
    {
      v: '',
      maybe: ['1', '6', '8'],
      blk: 7,
      item: 2,
      i: 6,
      j: 5,
    },
    {
      v: '',
      maybe: ['1', '6', '8'],
      blk: 7,
      item: 3,
      i: 7,
      j: 3,
    },
    {
      v: '',
      maybe: ['4', '7'],
      blk: 7,
      item: 4,
      i: 7,
      j: 4,
    },
    {
      v: '',
      maybe: ['1', '4', '6', '7', '8'],
      blk: 7,
      item: 5,
      i: 7,
      j: 5,
    },
    {
      v: '2',
      maybe: ['1', '6'],
      blk: 7,
      item: 6,
      i: 8,
      j: 3,
    },
    {
      v: '5',
      maybe: [],
      blk: 7,
      item: 7,
      i: 8,
      j: 4,
    },
    {
      v: '3',
      maybe: ['1', '6'],
      blk: 7,
      item: 8,
      i: 8,
      j: 5,
    },
  ],
  [
    {
      v: '',
      maybe: ['2', '6'],
      blk: 8,
      item: 0,
      i: 6,
      j: 6,
    },
    {
      v: '4',
      maybe: [],
      blk: 8,
      item: 1,
      i: 6,
      j: 7,
    },
    {
      v: '5',
      maybe: ['1', '2'],
      blk: 8,
      item: 2,
      i: 6,
      j: 8,
    },
    {
      v: '3',
      maybe: ['2', '6'],
      blk: 8,
      item: 3,
      i: 7,
      j: 6,
    },
    {
      v: '9',
      maybe: [],
      blk: 8,
      item: 4,
      i: 7,
      j: 7,
    },
    {
      v: '',
      maybe: ['1', '2'],
      blk: 8,
      item: 5,
      i: 7,
      j: 8,
    },
    {
      v: '',
      maybe: ['6', '7'],
      blk: 8,
      item: 6,
      i: 8,
      j: 6,
    },
    {
      v: '8',
      maybe: [],
      blk: 8,
      item: 7,
      i: 8,
      j: 7,
    },
    {
      v: '',
      maybe: ['1', '7'],
      blk: 8,
      item: 8,
      i: 8,
      j: 8,
    },
  ],
]

const game = location.hash.slice(1)
export const soduko: Soduko = X90.map((blk) => {
  return X90.map((item) => {
    const { i, j } = bi2ij([blk, item])

    const v = game[i * 9 + j]
    return {
      v: v === '0' || v === '.' ? '' : v,
      i,
      j,
      blk,
      item,

      maybe: new Set(X91),
    }
  })
})
;(window as any).soduko = soduko

allItems().forEach(({ v, blk, item }) => {
  mutationItemValue('delete', v, blk, item)
})

createApp(App, {
  // compilerOptions: {
  //   isCustomElement: (tag) => tag.xx == 'block',
  // },
}).mount('#app')

export function mutationItemValue(type: 'delete' | 'add', val: string, blk: number, blkIdx: number) {
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
