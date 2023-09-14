export const scriptSql = {
  CREATE_TABLE_USER: `CREATE TABLE IF NOT EXISTS tbl_user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    created_at DATE DEFAULT (datetime('now','localtime')),
    updated_at DATE DEFAULT (datetime('now','localtime'))
  );`,
  CREATE_TABLE_SESSION: `CREATE TABLE IF NOT EXISTS tbl_session (
     id CHAR(36) PRIMARY KEY,
     user_id INTEGER NOT NULL,
     created_at DATE DEFAULT (datetime('now','localtime')),
     FOREIGN KEY (user_id) REFERENCES tbl_user (id)
    );`,

  DELETE_TABLE_USER: `DELETE FROM tbl_user`,
  DELETE_TABLE_SESSION: `DELETE FROM tbl_session`,
};
