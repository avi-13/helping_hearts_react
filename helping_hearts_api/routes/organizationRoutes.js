const router = require("express").Router();

const organizationController = require("../controller/admin_controller/organizationController");

router.post(
  "/registerOrganization",
  organizationController.registerOrganization
);

router.delete("/delete-organization/:id", organizationController.deleteOrganization );

router.put("/update-organization/:id", organizationController.updateOrganization);

router.get("/get-all-organization", organizationController.getAllOrganizations);

router.get("/single-organization/:id", organizationController.getOrgById);

// router.get("/send-info/:id", bloodBankController.sendEmailController);

module.exports = router;