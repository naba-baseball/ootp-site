<script setup lang="ts">
const teamId = useRoute().params.teamId
const { data, status } = useQuery({
  key: ['team', teamId],
  query: () => useRequestFetch()(`/api/teams/${teamId}`),
})
const team = toRef(() => data.value.team)
const topEra = toRef(() => data.value.topEra)
</script>

<template>
  <div v-if="status !== 'success'">
    Loading...
  </div>
  <div
    v-else
    class="max-w-full"
  >
    <h1>{{ team.name }} {{ team.nickname }}</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 [&>*]:(h-12em bg-gray-1A border border-gray-2A p-6 rounded text-xl font-bold flex gap-3)">
      <div>
        <img
          alt="Player photo"
          class="w-67px h-100px"
        >
        <div class="uppercase tracking-wide text-sm">
          Team Leaders AVG
        </div>
        <ul>
          <li />
          <li />
          <li />
          <li />
        </ul>
      </div>
      <div class="">
        <img
          alt="Player photo"
          class="w-67px h-100px"
        >
        <div class="w-full">
          <div class="uppercase tracking-wide text-base font-bold text-gray-11">
            Team Leaders HR
          </div>
          <ul>
            <li />
            <li />
            <li />
            <li />
          </ul>
        </div>
      </div>
      <div>
        <img
          alt="Player photo"
          class="w-67px h-100px"
        >
        <div class="text-lg">
          Team Leaders RBI
        </div>
        <ul>
          <li />
          <li />
          <li />
          <li />
        </ul>
      </div>
      <div>
        <img
          alt="Player photo"
          class="w-67px h-100px"
        >
        <div class="text-lg">
          Team Leaders W
        </div>
        <ul>
          <li />
          <li />
          <li />
          <li />
        </ul>
      </div>
      <div>
        <img
          alt="Player photo"
          class="w-67px h-100px"
        >
        <div class="text-lg">
          Team Leaders ERA
        </div>
        <ul class="font-normal">
          <li
            v-for="p of topEra"
            :key="p.player_id"
            class="tabular-nums grid grid-flow-col justify-between w-full"
          >
            <span>{{ p.player_name }}</span> <span class="font-mono tabular-nums">{{ p.era }}</span>
          </li>
        </ul>
      </div>
      <div>
        <img
          alt="Player photo"
          class="w-67px h-100px"
        >
        <div class="text-lg">
          Team Leaders K
        </div>
        <ul>
          <li />
          <li />
          <li />
          <li />
        </ul>
      </div>
    </div>
  </div>
</template>
