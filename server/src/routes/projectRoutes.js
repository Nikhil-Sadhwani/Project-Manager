const express = require("express");
const router = express.Router();
const {
  getProjects,
  addProject,
  updateScore,
} = require("../controllers/projectController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get("/", getProjects);
router.post(
  "/add",
  upload.fields([{ name: "image1" }, { name: "image2" }]),
  addProject
);

router.put("/:id/score", updateScore);

module.exports = router;
