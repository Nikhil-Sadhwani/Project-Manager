const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const projectRoutes = require("./routes/projectRoutes");

dotenv.config();
connectDB();

const app = express();

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use(cors());
app.use(bodyParser.json());

app.use("/api/projects", projectRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
