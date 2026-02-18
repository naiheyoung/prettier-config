import { describe, it, expect } from 'vitest'
import * as prettier from 'prettier'
import fs from 'fs-extra'
import n from '../src/index'

describe('sort attributes', () => {
  it('index.html', async () => {
    const source = await fs.readFile('snippets/index.html', 'utf-8')
    expect(
      await prettier.format(source, {
        ...n,
        parser: 'html'
      })
    ).toMatchInlineSnapshot(
      `
      "<!doctype html>
      <html lang="en" id="root" class="text">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <title>Vitue Lite</title>
          <meta name="description" content="Opinionated Vite Starter Template" />
        </head>

        <body class="font-sans dark:text-white dark:bg-hex-121212" border="1">
          <div id="root" class="w-full h-full"></div>
          <noscript> Please enable JavaScript to use this application. </noscript>
          <script>
            ;(function () {
              const prefersDark =
                window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
              const setting = localStorage.getItem('color-schema') || 'auto'
              if (setting === 'dark' || (prefersDark && setting !== 'light'))
                document.documentElement.classList.toggle('dark', true)
            })()
          </script>
          <script type="module" src="/src/main.ts"></script>
        </body>
      </html>
      "
    `
    )
  })

  it('playground.vue', async () => {
    const source = await fs.readFile('snippets/playground.vue', 'utf-8')
    expect(
      await prettier.format(source, {
        ...n,
        parser: 'vue'
      })
    ).toMatchInlineSnapshot(`
      "<template>
        <div
          id="todos"
          ref="todosEl"
          style="color: pink"
          :style="{ color: 'pink' }"
          class="text-red"
          :class="inline"
          :data="todos"
          :key="idx"
          [font]
          info="this is test file."
          v-for="(item, idx) in todos"
          v-if="todos"
          v-text="item.title"
          @a=""
          @b=""
          @click=""
          data-a=""
          data-type="todos"></div>
        <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
          <path
            d="M12 5v6m0 3v1.5m0 3v.5m6-8l-6-6m-6 6l6-6"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2" />
        </svg>
      </template>

      <script setup lang="ts">
      import type { Plugin } from 'prettier'
      // @ts-expect-error missing type
      import { a, b, h, ref, _ } from 'vue'
      // @ts-expect-error
      import xxx from 'xxx'

      const todos = ref([
        {
          title: ''
        }
      ])

      const newTodo = (title: string) => {
        todos.value.push({ title })
      }
      </script>

      <script>
      import * as prettier from 'prettier'
      // @ts-expect-error
      import {a,b} from x
      </script>
      "
    `)
  })
})

describe('sort specifiers', () => {
  it('playground.ts', async () => {
    const source = await fs.readFile('snippets/playground.ts', 'utf-8')
    expect(
      await prettier.format(source, {
        ...n,
        parser: 'typescript'
      })
    ).toMatchInlineSnapshot(`
      "import type { a, b, c, _ } from 'xxx'
      // import syntax
      import type x from 'x'
      // @ts-nocheck i know
      import { a, b as a, c, _ } from 'xxx'
      import XXX from 'xxx'
      import xxx from 'xxx'
      /* named import */
      import A, { a, b, _a, _c } from 'xxx'

      async function fn(user: string) {
        await fetch(\`https://api.example.com/\${user}\`)
      }

      function fn(user: string) {
        fetch(\`https://api.example.com/\${user}\`)
      }

      const fetchUser = (user: string) => {
        fetch(\`https://api.example.com/\${user}\`).then(({ data }) => {
          return data
        })
      }

      const fetchUser = async (user: string) => {
        const { data } = await fetch(\`https://api.example.com/\${user}\`)
        return data
      }
      "
    `)
  })
})
