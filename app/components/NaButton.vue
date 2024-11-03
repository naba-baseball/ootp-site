<script setup lang="ts">
const { is = 'button' } = defineProps<{ is?: 'button' | string }>()
</script>

<template>
  <component
    :is
    class="px-3 transition transition-all rounded-t font-mono font-bold tracking-wider uppercase leading-loose bg-gray-2 py-1 text-gray-12"
    border-b="1px solid gray-7"
    type="submit"
    hover="bg-gray-4"
  >
    <slot />
  </component>
</template>
