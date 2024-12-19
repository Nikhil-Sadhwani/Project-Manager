const express = require("express");
const path = require("path");
const router = express.Router();
const {
  getProjects,
  addProject,
  updateScore,
} = require("../controllers/projectController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/tmp");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.get("/", getProjects);
router.post(
  "/add",
  upload.fields([{ name: "image1" }, { name: "image2" }]),
  addProject
);

router.put("/:id/score", updateScore);

module.exports = router;
