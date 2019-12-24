require("dotenv").config();

module.exports = {
    port: process.env.PORT || 3028,
    db_url: DB_URL
}