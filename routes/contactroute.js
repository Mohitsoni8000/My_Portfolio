const express = require("express");

const route = express.Router();

const Contactcontroller = require("../controller/contactcontroller");


// CREATE CONTACT
route.post("/contact1", Contactcontroller.CreateContact);


// GET ALL CONTACTS
route.get("/contact2", Contactcontroller.GetAllContact);


// SEARCH CONTACT BY ID
route.get("/search/:id", Contactcontroller.SearchContact);



// DELETE CONTACT
route.delete("/delete/:id", Contactcontroller.DeleteContact);


// UPDATE CONTACT
route.put("/update/:id", Contactcontroller.UpdateContact);




module.exports = route;