import "dotenv/config"; // Loads .env variables

const config = {
  development: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "changeme",
    database: process.env.DB_NAME || "studentsvault",
    host: process.env.DB_HOST|| "localhost",
    dialect: "postgres",
  },
};

export default config; // ✅ Use ES module export
