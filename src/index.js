require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
const { globalErrorHandler } = require("./middlewares/globalErrorHandler");
const { projectRouter } = require("./routes/projectRouter");
const { testimonialRouter } = require("./routes/testimonialRouter");

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

    app.use("/api/projects", projectRouter);
    app.use("/api/testimonials", testimonialRouter);

    app.use((req, res) => {
      res.status(404).send({
        success: false,
        message: "Route not found",
      });
    });

    // Global error handler
    app.use(globalErrorHandler);

    app.listen(PORT, () => {
      console.log(`Server running in port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
