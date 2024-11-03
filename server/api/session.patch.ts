import * as v from 'valibot'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, data => v.parse(v.object({
    year: v.number(),
  }), data))
  for (const key in body) {
    if (key === 'year') {
      await setUserSession(event, { year: body.year })
    }
  }
})
