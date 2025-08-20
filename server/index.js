const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json()); // Allows JSON parsing
app.use(cors()); // Enables cross-origin requests

// API routes
const todoRoutes = require("./routes/todoRoutes");
app.use("/api", todoRoutes);

// Serve static files from Next.js build
app.use(express.static(path.join(__dirname, "../client/out")));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Define a simple route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/out/index.html"));
});

// Catch-all handler for client-side routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/out/index.html"));
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
