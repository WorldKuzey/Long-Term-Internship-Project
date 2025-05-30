const express = require("express");
const router = express.Router();
const ReportController = require("../controller/reportController");

router.get("/tree-view", ReportController.getTreeView);
router.post("/postQuery", ReportController.postQuery);

router.post("/criterion", ReportController.postRecNo);
router.get("/criterion", ReportController.getCriterion);

router.post("/combo-options", ReportController.postOptions);
router.get("/combo-options", ReportController.getOptions);

module.exports = router;
