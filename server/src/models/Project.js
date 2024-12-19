const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Completed"],
    default: "Pending",
  },
  candidate: { type: String, required: true },
  score: { type: Number, default: 0 },
  image1: { type: String, required: true },
  image2: { type: String, required: true },
  openedImage: { type: String, default: "" },
});

module.exports = mongoose.model("Project", projectSchema);
