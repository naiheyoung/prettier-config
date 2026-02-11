<template>
  <section class="fixed top-10 left-50% -transform-translate-x-50%">
    <p class="" tabindex="-1" id="title" data-title="effect" ref="el" v-if="count" v-for="item in 3" :key="item" aria-hidden [data-src] :class="['font-mono']" :style="{color: 'pink'}">一个神奇的效果.</p>
    <p>当悬浮图片时, 将会从中心开始逐渐向外变换为彩色!</p>
  </section>
  <div class="hdvh flex gap2 items-center justify-center">
    <a href="https://images.pexels.com/photos/28608386/pexels-photo-28608386.jpeg" target="_blank" class="grid">
      <img src="https://images.pexels.com/photos/28608386/pexels-photo-28608386.jpeg" width="300" />
      <img src="https://images.pexels.com/photos/28608386/pexels-photo-28608386.jpeg" width="300" />
    </a>
  </div>
</template>

<script setup lang="ts">
let count: number = 1;

const obj = { name: '@naiheyoung/prettier', version: '0.0.1' }

const {version} = obj

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
