<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()



const count = ref(0)
</script>

<template>
<div>
  <h1>{{ count }}</h1>
  <img src="../assets/vue.svg" alt="">
  <p>dsfdsf</p>
</div>


</template>

<style scoped>

</style>
