<template>
  <Html class="text-gray-12 bg-gray-1A" />
  <main class="container mx-auto">
    <nav class="*:text-xl">
      <YearSelect />
      <NuxtLink
        to="/"
      >
        Home
      </NuxtLink>
      <NuxtLink
        to="/teams"
      >
        Teams
      </NuxtLink>
      <NuxtLink
        to="/upload"
      >
        Upload
      </NuxtLink>
    </nav>
    <NuxtRouteAnnouncer />
    <article>
      <NuxtPage />
    </article>
  </main>
</template>
