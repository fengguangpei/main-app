<script setup>
import { ref } from 'vue'
const number = ref(0)
</script>

<template>
  <div class="counter">
    <h1>Number: {{ number }}</h1>
  </div>
</template>

<style scoped lang="scss">
.counter {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
