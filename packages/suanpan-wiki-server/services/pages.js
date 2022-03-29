const sql = require('../db/db');

module.exports = {
  listPages() {
    return sql`
      select * from pages
    `;
  }
}