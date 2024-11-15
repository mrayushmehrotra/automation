require("dotenv").config({ path: "./.env" });
const express = require("express");
const mongoose = require("mongoose");
const agenda = require("./config/agenda");
const emailRoutes = require("./routes/emailRoutes");
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors())


// Connect to MongoDB

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start Agenda
agenda.on("ready", () => {
  agenda.start();
  console.log("Agenda started");
});

// Use email routes
app.use("/api/emails", emailRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
