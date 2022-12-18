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
const { formatResponse } = require("./common/middleware/formatResponse");

// Connect Database
connectDataBase();

// Init Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors);
app.use(logRequest);
app.use(formatResponse);

// Init Schedules

// Define Routes
app.use("/", (req, res) =>
  res.status(200).json({ message: "Active", details: {} })
);
app.use("/api/v1/accounts", require("./accounts/routes"));
app.use("/api/v1/workspaces", require("./workspaces/routes"));
app.use("/api/v1/collections", require("./collections/routes"));
app.use("/api/v1/test-cases", require("./testCases/routes"));
app.use(errorHandler);
actionOnUnhandled();
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
