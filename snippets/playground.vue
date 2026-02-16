<template>
  <div
    id="todos"
    ref="todosEl"
    :style="{ color: 'pink' }"
    class="text-red"
    :class="inline"
    [font]
    info="this is test file."
    style="color: pink"
    v-for="(item, idx) in todos"
    v-if="todos"
    v-text="item.title"
    :data="todos"
    :key="idx"
    @click=""
    data-type="todos"></div>
  <svg xmlns="http://www.w3.org/2000/svg" height="1.2em" viewBox="0 0 24 24" width="1.2em">
    <path
      d="M12 5v6m0 3v1.5m0 3v.5m6-8l-6-6m-6 6l6-6"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2" />
  </svg>
</template>

<script lang="ts" setup>
// @ts-expect-error missing type
import { ref, h, _,b,a } from 'vue'
import type {Plugin } from 'prettier'

const todos = ref([
  {
    title: ''
  }
])
// @ts-expect-error
import xxx from 'xxx'

const newTodo = (title: string) => {
  todos.value.push({ title })
}
</script>

<script>
import * as prettier from 'prettier'
// @ts-expect-error
import { b,a} from x
</script>
