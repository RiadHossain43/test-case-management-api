require("dotenv").config();
const express = require("express");
const { connectDataBase } = require("./.config/databaseManager");
const { cors } = require("./common/middleware/cors");
const app = express();
const { errorHandler } = require("./common/middleware/errorHandler");
const { logRequest } = require("./common/middleware/logRequest");
const {
  actionOnUnhandled,
} = require("./common/helper/error/unhandledRejections");

// Connect Database
connectDataBase();

// Init Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors);
app.use(logRequest);

// Init Schedules

// Define Routes
app.use("/api/v1/auth", require("./auth/routes"));
app.use("/api/v1/collections", require("./collections/routes"));
app.use("/api/v1/test-cases", require("./testCases/routes"));
app.use(errorHandler);
actionOnUnhandled();
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
