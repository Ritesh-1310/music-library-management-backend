require("dotenv").config(); 
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const artistRoutes = require("./routes/artistRoutes");
const albumRoutes = require("./routes/albumRoutes");
const trackRoutes = require("./routes/trackRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");

const app = express();

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1);
  });

// Middleware
app.use(cookieParser());
app.use(express.json());

// Root route - Friendly message with HTML formatting
app.get("/", (req, res) => {
  const routes = [];

  const extractRoutes = (stack, parentPath = "") => {
    stack.forEach((middleware) => {
      if (middleware.route) {
        // Route-level middleware
        let fullPath = parentPath + middleware.route.path;
        fullPath = fullPath
          .replace(/\?\(\?=\/\|\$\)/g, "") 
          .replace(/\/+/g, "/"); 
        routes.push({
          path: fullPath,
          methods: Object.keys(middleware.route.methods).join(", ").toUpperCase(),
        });
      } else if (middleware.name === "router") {
        // Nested router
        const nestedPath =
          parentPath +
          middleware.regexp
            .source.replace(/\\\//g, "/") 
            .replace(/\^|\$$/g, "") 
            .replace(/\?\(\?=\/\|\$\)/g, "")
            .replace(/\/+/g, "/"); 
        extractRoutes(middleware.handle.stack, nestedPath);
      }
    });
  };

  extractRoutes(app._router.stack);

  // Send the routes as a response
  res.status(200).json({
    message: "Welcome to the Music-Library-Management API!",
    availableRoutes: routes,
  });
});


// Health check route
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ message: "Server is healthy" });
});

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/artists", artistRoutes);
app.use("/api/v1/albums", albumRoutes);
app.use("/api/v1/tracks", trackRoutes);
app.use("/api/v1/favorites", favoriteRoutes);


// Not found route
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong, please try again later." });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
