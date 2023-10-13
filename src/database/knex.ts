import { knex } from "knex";

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './src/database/labecommerce.db'
  },
  useNullAsDefault: true,
  pool: {
    min: 0,
    max: 1,
    afterCreate: (conn: any, cb: any) => {
      conn.run("PRAGMA foreign_keys = ON", cb)
    }
  }
});

export { db };