import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
Object.defineProperty(Object.prototype, 'xx', {
  get() {
    console.log(this)
    // if (typeof this === 'function') return this.bind(this)
    return this
  },
})

window.game1 = [
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
window.game2 = [
  [
    {
      v: '2',
      maybe: new Set(['8']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '6',
      maybe: new Set([]),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '7',
      maybe: new Set([]),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '',
      maybe: new Set(['1', '3', '8']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '5',
      maybe: new Set(['1', '3', '4']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '',
      maybe: new Set(['1', '4']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '',
      maybe: new Set(['1', '3', '8', '9']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '',
      maybe: new Set(['1', '3', '4', '9']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '',
      maybe: new Set(['1', '4', '9']),
      resolveRow: '',
      resolveCol: '',
    },
  ],
  [
    {
      v: '1',
      maybe: new Set(['8']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '3',
      maybe: new Set([]),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '4',
      maybe: new Set(['8']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '',
      maybe: new Set(['2', '8']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '9',
      maybe: new Set(['2']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '',
      maybe: new Set(['2', '8']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '7',
      maybe: new Set(['2', '8']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '5',
      maybe: new Set(['2']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '6',
      maybe: new Set(['2', '8']),
      resolveRow: '',
      resolveCol: '',
    },
  ],
  [
    {
      v: '',
      maybe: new Set(['5', '8']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '',
      maybe: new Set(['5', '8']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '9',
      maybe: new Set(['8']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '',
      maybe: new Set(['1', '2', '3', '4', '8']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '6',
      maybe: new Set(['2', '3', '8']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '7',
      maybe: new Set(['1', '8']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '',
      maybe: new Set(['1', '2', '3', '4', '8']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '',
      maybe: new Set(['2', '3', '8']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '',
      maybe: new Set(['1', '8']),
      resolveRow: '',
      resolveCol: '',
    },
  ],
  [
    {
      v: '6',
      maybe: new Set(['1', '9']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '',
      maybe: new Set(['1', '2', '9']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '3',
      maybe: new Set(['1', '2', '9']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '4',
      maybe: new Set(['9']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '7',
      maybe: new Set(['2', '9']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '',
      maybe: new Set(['2', '9']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '5',
      maybe: new Set(['1']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '',
      maybe: new Set(['1', '2']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '8',
      maybe: new Set(['1', '2']),
      resolveRow: '',
      resolveCol: '',
    },
  ],
  [
    {
      v: '',
      maybe: new Set(['2', '8', '9']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '4',
      maybe: new Set(['2']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '',
      maybe: new Set(['1', '2', '8']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '',
      maybe: new Set(['2', '6', '8', '9']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '',
      maybe: new Set(['2', '6']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '5',
      maybe: new Set(['2', '8']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '',
      maybe: new Set(['2', '3']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '7',
      maybe: new Set(['2']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '',
      maybe: new Set(['1', '2', '3']),
      resolveRow: '',
      resolveCol: '',
    },
  ],
  [
    {
      v: '7',
      maybe: new Set(['2', '8']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '',
      maybe: new Set(['2', '8']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '5',
      maybe: new Set(['8']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '',
      maybe: new Set(['2', '8']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '1',
      maybe: new Set(['2', '8']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '3',
      maybe: new Set(['8']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '9',
      maybe: new Set(['2']),
      resolveRow: '4',
      resolveCol: '',
    },
    {
      v: '4',
      maybe: new Set(['2']),
      resolveRow: '4',
      resolveCol: '',
    },
    {
      v: '6',
      maybe: new Set([]),
      resolveRow: '',
      resolveCol: '',
    },
  ],
  [
    {
      v: '',
      maybe: new Set(['1', '3']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '',
      maybe: new Set(['1', '2', '3', '4']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '',
      maybe: new Set(['1', '2', '4', '6']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '',
      maybe: new Set(['3', '9']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '8',
      maybe: new Set(['2', '3', '9']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '',
      maybe: new Set(['2', '5', '6', '9']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '7',
      maybe: new Set(['1', '3']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '',
      maybe: new Set(['1', '3']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '',
      maybe: new Set(['1', '5', '6']),
      resolveRow: '',
      resolveCol: '',
    },
  ],
  [
    {
      v: '5',
      maybe: new Set(['2', '3', '6']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '',
      maybe: new Set(['2', '6']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '7',
      maybe: new Set(['2', '3']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '',
      maybe: new Set(['2', '3', '6']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '1',
      maybe: new Set(['2', '6']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '',
      maybe: new Set(['2', '3']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '4',
      maybe: new Set(['3', '6']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '8',
      maybe: new Set(['6']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '9',
      maybe: new Set(['3']),
      resolveRow: '',
      resolveCol: '',
    },
  ],
  [
    {
      v: '',
      maybe: new Set(['1', '3', '6', '8']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '9',
      maybe: new Set(['3', '8']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '',
      maybe: new Set(['1', '8']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '',
      maybe: new Set(['3', '5', '6']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '7',
      maybe: new Set(['3', '5']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '4',
      maybe: new Set([]),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '',
      maybe: new Set(['1', '3', '5', '6']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '',
      maybe: new Set(['3', '5']),
      resolveRow: '',
      resolveCol: '',
    },
    {
      v: '2',
      maybe: new Set(['1']),
      resolveRow: '',
      resolveCol: '',
    },
  ],
]
createApp(App).mount('#app')
