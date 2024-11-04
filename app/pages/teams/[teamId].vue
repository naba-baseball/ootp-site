<script setup lang="ts">
const teamId = useRoute().params.teamId
const { data, status } = useQuery({
  key: ['team', teamId],
  query: () => useRequestFetch()(`/api/teams/${teamId}`),
})
const team = toRef(() => data.value?.team ?? [])
const topEra = toRef(() => data.value?.topEra ?? [])
const topK = toRef(() => data.value?.topK ?? [])
const topW = toRef(() => data.value?.topW ?? [])
const topAvg = toRef(() => data.value?.topAvg ?? [])
const topHr = toRef(() => data.value?.topHr ?? [])
const topRbi = toRef(() => data.value?.topRbi ?? [])
</script>

<template>
  <div v-if="status !== 'success'">
    Loading...
  </div>
  <div v-else>
    <h1>{{ team.name }} {{ team.nickname }}</h1>
    <div class="grid grid-cols-[repeat(3,320px)] gap-6 [&>*]:(h-12em bg-gray-1A border border-gray-2A p-6 rounded font-bold flex gap-3)">
      <TeamTopStat
        :items="topAvg"
        title="Team Leaders AVG"
        item-key="player_id"
        item-title="player_name"
        :item-value="i => `${i.avg}`.padEnd(5, '0')"
      />
      <TeamTopStat
        :items="topHr"
        title="Team Leaders HR"
        item-key="player_id"
        item-title="player_name"
        item-value="hr"
      />
      <TeamTopStat
        :items="topRbi"
        title="Team Leaders RBI"
        item-key="player_id"
        item-title="player_name"
        item-value="rbi"
      />
      <TeamTopStat
        :items="topW"
        title="Team Leaders W"
        item-key="player_id"
        item-title="player_name"
        item-value="w"
      />
      <TeamTopStat
        :items="topEra"
        title="Team Leaders ERA"
        item-key="player_id"
        item-title="player_name"
        item-value="era"
      />
      <TeamTopStat
        :items="topK"
        title="Team Leaders K"
        item-key="player_id"
        item-title="player_name"
        item-value="k"
      />
    </div>
  </div>
</template>
