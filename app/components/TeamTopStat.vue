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
    <!-- <img
      src=""
      alt="Player photo"
      class="w-67px h-100px"
    > -->
    <div class="w-full">
      <span class="text-lg">
        <slot name="title">
          {{ title }}
        </slot>
      </span>
      <ul class="font-normal">
        <slot
          v-for="(item, index) of items"
          name="list-item"
        >
          <li
            :key="ids[index]"
            class="tabular-nums justify-between"
            grid="~ flow-col"
          >
            <span>{{ getItemTitle(item) }}</span> <span class="font-mono tabular-nums">{{ getItemValue(item) }}</span>
          </li>
        </slot>
      </ul>
    </div>
  </div>
</template>

<style>

</style>
