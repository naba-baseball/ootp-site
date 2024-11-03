<script lang="ts" setup>
const { session } = useUserSession()
const cache = useQueryCache()
const { mutate } = useMutation({
  mutation: (year: number) => $fetch('/api/session', { method: 'patch', body: { year } }),
  onSuccess: () => {
    cache.invalidateQueries({ key: ['team'] })
  },
})
watch(() => session.value.year, (year) => {
  if (year == null) return
  mutate(year)
})
const server = import.meta.server
</script>

<template>
  <BaseYearSelect>
    <select
      v-model.number="session.year"
      data-allow-mismatch
    >
      <template v-if="server">
        <option>
          {{ session.year }}
        </option>
      </template>
      <template v-else>
        <option />
        <option>
          2027
        </option>
        <option>
          2028
        </option>
      </template>
    </select>
  </BaseYearSelect>
</template>
