const router = require("express").Router();

const donationController = require("../controller/user_controller/donation.controller");

router.post("/add-donation", donationController.addDonation);

router.get("/my-donation/:id", donationController.getDonationByUserId);

router.delete("/delete-donation/:id", donationController.deleteDonation);

router.get("/donation/:id", donationController.getSingleDonation);

router.put("/update-donation/:id", donationController.updateRequest);


module.exports = router;
