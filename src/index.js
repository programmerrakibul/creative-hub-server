require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const startServer = async () => {
  try {
    await connectDB();

    app.get("/", (req, res) => {
      res.send({
        message: "Server is running",
      });
    });

    app.use((req, res) => {
      res.status(404).send({
        message: "Route not found",
      });
    });

    app.listen(PORT, () => {
      console.log(`Server running in port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
