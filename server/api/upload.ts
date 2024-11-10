export default defineEventHandler(async (event) => {
  // validate files and save them
  const files = await readMultipartFormData(event)
  if (!files?.length) return createError({ statusCode: 400, message: 'No files found in request' })
  const storage = useStorage('uploads')
  await Promise.all(files.map(async (file) => {
    storage.setItemRaw(file.filename!, file.data)
  }))
  await runTask('migrate')
  return sendRedirect(event, '/')
})
