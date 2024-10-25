<template>
  <Html class="text-gray-12 bg-gray-1A" />
  <main class="container mx-auto">
    <nav class="*:text-xl">
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
    </nav>
    <NuxtRouteAnnouncer />
    <article>
      <NuxtPage />
    </article>
  </main>
</template>
