<script lang="ts" setup generic="T">
const { items, itemKey, itemTitle, itemValue } = defineProps<{
  items: T[]
  title?: string
  itemValue?: keyof T | ((item: T) => string)
  itemTitle?: keyof T | ((item: T) => string)
  itemKey?: keyof T | ((item: T) => string) }>()
const ids = computed(() => {
  if (itemKey) {
    if (typeof itemKey === 'function') {
      return items.map(itemKey)
    }
    return items.map(item => item[itemKey])
  }
  return items.map(() => useId())
})
const getItemTitle = (item: T) => {
  if (typeof itemTitle === 'function') {
    return itemTitle(item)
  }
  if (itemTitle) {
    return item[itemTitle]
  }
  return item
}
const getItemValue = (item: T) => {
  if (typeof itemValue === 'function') {
    return itemValue(item)
  }
  if (itemValue) {
    return item[itemValue]
  }
  return item
}
</script>

<template>
  <div>
    <img
      alt="Player photo"
      class="w-67px h-100px"
    >
    <div class="text-lg">
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <ul class="font-normal">
      <slot
        v-for="(item, index) of items"
        name="list-item"
      >
        <li
          :key="ids[index]"
          class="tabular-nums grid grid-flow-col justify-between w-full"
        >
          <span>{{ getItemTitle(item) }}</span> <span class="font-mono tabular-nums">{{ getItemValue(item) }}</span>
        </li>
      </slot>
    </ul>
  </div>
</template>

<style>

</style>
