import duckdb from 'duckdb'

const db = new duckdb.Database('.data/db.duckdb')
export function useDB() {
  const run = <T>(str: string, ...args: unknown[]): Promise<T> => {
    const { promise, resolve, reject } = Promise.withResolvers<T>()
    db.run(str, ...args, (err, res) => {
      if (err) {
        reject(err)
      }
      resolve(res)
    })
    return promise
  }
  const all = <T>(str: string, ...args: unknown[]): Promise<T[]> => {
    const { promise, resolve, reject } = Promise.withResolvers<T[]>()
    db.all(str, ...args, (err, res) => {
      if (err) {
        reject(err)
      }
      resolve(res as T[])
    })
    return promise
  }
  return { db, run, all }
}
