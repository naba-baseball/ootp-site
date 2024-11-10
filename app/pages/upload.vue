<script setup>

</script>

<template>
  <form
    method="POST"
    action="/api/upload"
    enctype="multipart/form-data"
  >
    <label>
      Upload SQL Files
      <input
        name="files"
        multiple
        type="file"
        @change="uploadFile"
      >
    </label>
    <NaButton type="submit">
      Upload
    </NaButton>
  </form>
</template>
