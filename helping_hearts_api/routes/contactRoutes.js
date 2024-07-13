const router = require("express").Router();

const contactController = require("../controller/user_controller/contactController");

router.post("/send-message", contactController.createContact);

router.get("/getallcontact", contactController.fetchALLcontacts);

router.get("contact_by_org/:id", contactController.getContactByOrg);


module.exports = router;
