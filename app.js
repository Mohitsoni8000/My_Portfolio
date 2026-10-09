const express = require("express");
const path = require("path");

const sequelize = require("./config/config");
const Contact = require("./models/contactmodel");
const contactRoute = require("./routes/contactroute");

const app = express();

// ===============================
// PORT
// ===============================

const PORT = process.env.PORT || 5000;

// ===============================
// MIDDLEWARE
// ===============================

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

// ===============================
// VIEW ENGINE (if using EJS)
// ===============================

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ===============================
// HOME ROUTE
// ===============================

app.get("/", (req, res) => {
    res.status(200).send(
        "Mohit Soni Portfolio Contact API is running successfully."
    );
});

// ===============================
// CONTACT API ROUTES
// ===============================

app.use("/Contact", contactRoute);

// ===============================
// 404 ROUTE
// Keep this at the bottom
// ===============================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "404 Not Found",
        requestedURL: req.originalUrl
    });
});

// ===============================
// ERROR HANDLER
// ===============================

app.use((err, req, res, next) => {
    console.error("Server error:", err);

    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
});

// ===============================
// DATABASE CONNECTION & SERVER
// ===============================

async function startServer() {
    try {
        await sequelize.authenticate();

        console.log("Database connected successfully.");

        // Sync models without alter:true
        await sequelize.sync();

        console.log("Database synchronized successfully.");

        app.listen(PORT, () => {
            console.log("-----------------------------------");
            console.log("Mohit Soni Contact API Started");
            console.log(`Server: http://localhost:${PORT}`);
            console.log("-----------------------------------");
        });

    } catch (error) {
        console.error("Database or server startup error:", error);
        process.exitCode = 1;
    }
}

startServer();