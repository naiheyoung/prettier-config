import { it, expect } from 'vitest'
import * as prettier from 'prettier'
import fs from 'fs-extra'
import n from '../src/index'

it('test personal prettier config', async () => {
  const source = await fs.readFile('snippets/playground.vue', 'utf-8')
  expect(
    await prettier.format(source, {
      ...n,
      parser: 'vue'
    })
  ).toMatchInlineSnapshot(`
    "<template>
      <section class="fixed top-10 left-50% -transform-translate-x-50%">
        <p
          tabindex="-1"
          id="title"
          ref="el"
          :style="{ color: 'pink' }"
          class=""
          :class="['font-mono']"
          [data-src]
          v-for="item in 3"
          v-if="count"
          :key="item"
          data-title="effect"
          aria-hidden>
          一个神奇的效果.
        </p>
        <p>当悬浮图片时, 将会从中心开始逐渐向外变换为彩色!</p>
      </section>
      <div class="hdvh flex gap2 items-center justify-center">
        <a
          class="grid"
          href="https://images.pexels.com/photos/28608386/pexels-photo-28608386.jpeg"
          target="_blank">
          <img
            src="https://images.pexels.com/photos/28608386/pexels-photo-28608386.jpeg"
            width="300" />
          <img
            src="https://images.pexels.com/photos/28608386/pexels-photo-28608386.jpeg"
            width="300" />
        </a>
      </div>
    </template>

    <script lang="ts" setup>
    let count: number = 1

    const obj = { name: '@naiheyoung/prettier', version: '0.0.1' }

    const { version } = obj

    const counter = () => {
      count++
    }

    const fn1 = (param: any) => {
      console.log('one param.')
    }

    const fn2 = (param1: any, param2: any) => {
      console.log('two param.')
    }
    </script>
    "
  `)
})
