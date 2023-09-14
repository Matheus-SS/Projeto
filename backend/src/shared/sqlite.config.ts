/* eslint-disable @typescript-eslint/no-var-requires */
const sqlite = require('better-sqlite3');

export class SqliteConfig {
  #database;
  constructor() {
    const db = sqlite('./database.sqlite', {
      verbose: console.log,
    });
    this.#database = db;
  }

  public executeScript(script: string): void {
    this.#database.exec(script);
  }
}
