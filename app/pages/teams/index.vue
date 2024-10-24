<script lang="ts" setup>
const { data: teams } = await useFetch('/api/teams')
if(!teams.value) throw new Error('Failed to fetch teams')
const teamsByDivision = Object.groupBy(teams.value, ( { division_name } ) => division_name)
console.log(teamsByDivision)
</script>

<template>
  <div>
    <h1>Teams</h1>
    <div style="display:grid; grid-auto-flow: column;">
      <div v-for="[division, teams] of Object.entries(teamsByDivision)" :key="division">
        <h2>{{ division }}</h2>
        <ul>
          <li v-for="team of teams" :key=team.team_id>
            <nuxt-link :to="`/teams/${team.team_id}`">{{ team.name }} {{ team.nickname }}</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>

</style>