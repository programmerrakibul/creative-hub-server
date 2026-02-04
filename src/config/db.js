const mongoose = require("mongoose");

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME || "creative-hub";

// Validate required environment variables
if (!DB_USERNAME?.trim()) {
  throw new Error("DB_USERNAME environment variable is required");
}

if (!DB_PASSWORD?.trim()) {
  throw new Error("DB_PASSWORD environment variable is required");
}

const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.xoreaon.mongodb.net/${DB_NAME}?appName=Cluster0`;

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

const connectDB = async () => {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("You successfully connected to MongoDB!");
  } catch (error) {
    throw error;
  } finally {
    //  await mongoose.disconnect();
  }
};

module.exports = { connectDB };
