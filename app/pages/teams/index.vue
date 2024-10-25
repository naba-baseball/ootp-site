<script lang="ts" setup>
const { data: teams } = await useFetch('/api/teams')
if (!teams.value) throw new Error('Failed to fetch teams')
const teamsByDivision = Object.groupBy(teams.value, ({ division_name }) => division_name)
</script>

<template>
  <div>
    <h1>Teams</h1>
    <div class="grid">
      <div
        v-for="[division, divisionTeams] of Object.entries(teamsByDivision)"
        :key="division"
        class="prose max-w-full"
      >
        <h2>
          {{ division }}
        </h2>
        <hr class="h-2px w-1/2 my-0 bg-black">
        <ul class="ps-0 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <li
            v-for="team of divisionTeams"
            :key="team.team_id"
            class="list-none"
          >
            <!-- <img :src="`${useRuntimeConfig().public.ootpWebsiteUrl}/images/team_logos/${team.logo_file_name}`" :alt="`${ team.name } ${team.nickname} logo`"  > -->
            <h3>
              {{ team.name }} {{ team.nickname }}
            </h3>
            <div class="flex gap-3">
              <nuxt-link :to="`/teams/${team.team_id}`">
                Home page
              </nuxt-link>|
              <nuxt-link :to="`/teams/${team.team_id}/stats`">
                Leaders
              </nuxt-link>|
              <nuxt-link :to="`/teams/${team.team_id}/roster`">
                Roster
              </nuxt-link>|
              <nuxt-link :to="`/teams/${team.team_id}/schedule`">
                Schedule
              </nuxt-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
