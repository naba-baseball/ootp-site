// This file is for serializing pinia colada errors
class MyError extends Error {
  customData: unknown
  constructor() {
    super()
    console.log(' ERRORRRRRR')
  }
}
export default definePayloadPlugin(() => {
  definePayloadReducer(
    'MyError',
    // we serialize the data we need as an array, object, or any other serializable format
    data => data instanceof MyError && [data.message, data.customData],
  )
  definePayloadReviver(
    'MyError',
    // we revive the data back to an instance of MyError
    ([message, customData]) => new MyError(message, customData),
  )
})
