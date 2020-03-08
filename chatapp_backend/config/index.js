require("dotenv").config();

module.exports = {
    port: process.env.PORT || 3028,
    db_url: process.env.DB_URL,
    secret: process.env.SECRET,
    cloudinary_name: process.env.CLOUDINARY_NAME,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
}
