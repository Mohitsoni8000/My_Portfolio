require("dotenv").config();

const express = require("express");
const path = require("path");

const contactRoutes = require("./routes/contactroute");

const app = express();

const PORT = process.env.PORT || 5000;


// ===============================
// VIEW ENGINE
// ===============================

app.set("view engine", "ejs");

app.set(
    "views",
    path.join(__dirname, "views")
);


// ===============================
// MIDDLEWARE
// ===============================

// Static files
app.use(
    express.static(
        path.join(__dirname, "public")
    )
);

// JSON data
app.use(express.json());

// Form data
app.use(
    express.urlencoded({
        extended: true
    })
);


// ===============================
// PORTFOLIO DATA
// ===============================

const portfolioConfig = {

    title: "Mohit Soni — Node.js Developer Portfolio",

    description:
        "Portfolio of Soni Mohit Ajaybhai — Web & Node.js Developer",

    nav: [
        {
            href: "#home",
            label: "Home"
        },
        {
            href: "#about",
            label: "About"
        },
        {
            href: "#skills",
            label: "Skills"
        },
        {
            href: "#projects",
            label: "Projects"
        },
        {
            href: "#contact",
            label: "Contact"
        }
    ],

    successMessage: null,

    errorMessage: null
};


// ===============================
// HOME PAGE
// ===============================

app.get("/", (req, res) => {

    res.render(
        "index",
        portfolioConfig
    );

});


// ===============================
// CONTACT ROUTES
// ===============================

app.use(
    "/Contact",
    contactRoutes
);


// ===============================
// 404 HANDLER
// ===============================

app.use((req, res) => {

    res.status(404).send(
        `Page not found`
    );

});


// ===============================
// ERROR HANDLER
// ===============================

app.use((err, req, res, next) => {

    console.error(
        `SERVER ERROR:`,
        err
    );

    const statusCode =
        res.statusCode === 200
            ? 500
            : res.statusCode;

    res.status(statusCode).render(
        "index",
        {
            ...portfolioConfig,

            errorMessage:
                err.message ||
                `Internal Server Error`
        }
    );

});


// ===============================
// START SERVER
// ===============================

app.listen(PORT, () => {

    console.log(
        `Server is running on http://localhost:${PORT}`
    );

});