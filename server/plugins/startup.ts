export default defineNitroPlugin(async () => {
  console.log('Running migrations...')
  await runTask('migrate')
})
