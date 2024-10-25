<script setup lang="ts">
const { data } = await useFetch(`/api/teams/${useRoute().params.teamId}`)
if (!data.value) throw new Error('Team data not found')
const { team, players, topEra } = data.value
</script>

<template>
  <div class="max-w-full">
    <h1>{{ team.name }} {{ team.nickname }}</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 [&>*]:(h-12em bg-gray-1A border border-gray-2A p-6 rounded text-xl font-bold flex gap-3)">
      <div>
        <img
          alt="Player photo"
          class="w-67px h-100px"
        >
        <h2 class="text-lg">
          Team Leaders AVG
        </h2 class="text-lg">
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
          <h2 class="text-lg">
            Team Leaders HR
          </h2 class="text-lg">
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
      </div>
      <div>
        <img
          alt="Player photo"
          class="w-67px h-100px"
        >
        <h2 class="text-lg">
          Team Leaders RBI
        </h2 class="text-lg">
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
        <h2 class="text-lg">
          Team Leaders W
        </h2 class="text-lg">
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
        <h2 class="text-lg">
          Team Leaders ERA
        </h2 class="text-lg">
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
        <h2 class="text-lg">
          Team Leaders K
        </h2 class="text-lg">
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
