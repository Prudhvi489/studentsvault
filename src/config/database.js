import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Get environment (default to development)
const env = process.env.NODE_ENV || "development";

// Load DB config based on the environment
import dbConfig from "./config.js";
const config = dbConfig[env];

// Create a Sequelize instance
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: false, // Disable logging SQL queries (optional)
});

// Test the connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
})();

// Assign sequelize globally
global.sequelize = sequelize;

export default sequelize;
