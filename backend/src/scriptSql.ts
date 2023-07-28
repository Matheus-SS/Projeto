export const scriptSql = `CREATE TABLE IF NOT EXISTS tbl_user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  email TEXT NOT null,
  password text not Null
);`;
