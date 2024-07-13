const Contact = require("../../model/contactModel");
const user = require("../../model/userModel");

const createContact = async (req, res) => {
  try {
    const { name, email, number, message,user } = req.body;

    if (!name || !email || !number || !user|| !message) {
      return res.json({ success: false, message: "Empty Fields !!" });
    }

    const newContact = new Contact({
      name: name,
      email: email,
      number: number,
      message: message,
      user: user
    });
    await newContact.save();

    res.status(201).json({
      success: true,
      message: "Message Sent successfully",
      contact: newContact,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const fetchALLcontacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({ success: true, contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getContactByOrg = async (req, res) => {
  
  const userId = req.params.id;
  console.log("userId" , userId);
  try {
    const allContacts = await Contact.find({ organization: userId }).sort({
      createdAt: -1,
    });

    console.log("viewAllContacts", allContacts);

    res.status(200).json({
      success: true,
      allContacts: allContacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Cannot Get Contacts",
    });
  }
};

module.exports = { createContact, fetchALLcontacts,getContactByOrg };
