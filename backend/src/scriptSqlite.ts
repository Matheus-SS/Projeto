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
  CREATE_TABLE_ADDRESS: `CREATE TABLE IF NOT EXISTS tbl_address(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    cep TEXT NOT NULL,
    public_place TEXT,
    complement TEXT,
    neighborhood TEXT NOT NULL,
    city TEXT NOT NULL,
    uf CHAR(2) NOT NULL,
    created_at DATE DEFAULT (datetime('now','localtime')),
    updated_at DATE DEFAULT (datetime('now','localtime')),
    FOREIGN KEY (user_id) REFERENCES tbl_user(id)
  );`,
  DELETE_TABLE_ADDRESS: `DROP TABLE tbl_address`,
  DELETE_TABLE_USER: `DROP TABLE tbl_user`,
  DELETE_TABLE_SESSION: `DROP TABLE tbl_session`,
};
