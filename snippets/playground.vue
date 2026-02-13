<template>
  <div id="todos" ref="todosEl" v-for="(item, idx) in todos" :key="idx" v-text="item.title" :style="{color:'pink'}" class="text-red" :class="inline" style="color: pink;" v-if="todos" data-type="todos" [font] info="this is test file." :data="todos"></div>
<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 5v6m0 3v1.5m0 3v.5m6-8l-6-6m-6 6l6-6" />
      </svg>
</template>

<script lang="ts" setup>
// @ts-expect-error missing type
import {ref } from 'vue'

const todos = ref([
  {
    title: ''
  }
])

const newTodo = (title: string) => {
todos.value.push({ title})
}
</script>
