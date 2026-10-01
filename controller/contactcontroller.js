const Contact = require("../models/contactmodel");

// CREATE CONTACT
const CreateContact = async (req, res) => {
    try {
        console.log(`CONTACT DATA:`, req.body);

        const {
            name,
            email,
            mobile,
            message,
        } = req.body;

        // Validation
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                error: `Please provide name, email, and message.`
            });
        }

        // Create contact
        const contact = await Contact.create({
            name: name,
            email: email,
            mobile: mobile || null,
            message: message,
            status: `Pending`
        });

        return res.status(201).json({
            success: true,
            message: `Contact inquiry submitted successfully.`,
            data: contact
        });

    } catch (error) {

        console.log(`CONTACT ERROR:`, error);

        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};


// GET ALL CONTACTS
const GetAllContact = async (req, res) => {
    try {

        const contacts = await Contact.findAll({
            order: [["createdAt", "DESC"]]
        });

        return res.status(200).json({
            success: true,
            data: contacts
        });

    } catch (error) {

        console.log(`GET CONTACT ERROR:`, error);

        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};


// SEARCH CONTACT
const SearchContact = async (req, res) => {
    try {

        const { id } = req.params;

        const contact = await Contact.findByPk(id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                error: `Contact not found.`
            });
        }

        return res.status(200).json({
            success: true,
            data: contact
        });

    } catch (error) {

        console.log(`SEARCH CONTACT ERROR:`, error);

        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};


// UPDATE CONTACT
const UpdateContact = async (req, res) => {
    try {

        const { id } = req.params;

        const contact = await Contact.findByPk(id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                error: `Contact not found.`
            });
        }

        await contact.update(req.body);

        return res.status(200).json({
            success: true,
            message: `Contact updated successfully.`,
            data: contact
        });

    } catch (error) {

        console.log(`UPDATE CONTACT ERROR:`, error);

        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};


// DELETE CONTACT
const DeleteContact = async (req, res) => {
    try {

        const { id } = req.params;

        const contact = await Contact.findByPk(id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                error: `Contact not found.`
            });
        }

        await contact.destroy();

        return res.status(200).json({
            success: true,
            message: `Contact deleted successfully.`
        });

    } catch (error) {

        console.log(`DELETE CONTACT ERROR:`, error);

        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};



module.exports = {CreateContact,GetAllContact,SearchContact,DeleteContact,UpdateContact};