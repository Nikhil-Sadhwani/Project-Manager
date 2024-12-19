const Project = require("../models/Project");

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    const baseUrl = `http://localhost:5000`;
    const projectsWithImages = projects.map((project) => ({
      ...project.toObject(),
      image1: project.image1 ? `${baseUrl}/${project.image1}` : null,
      image2: project.image2 ? `${baseUrl}/${project.image2}` : null,
    }));

    res.status(200).json(projectsWithImages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addProject = async (req, res) => {
  const { title, description, candidate } = req.body;
  try {
    const image1 = req.files["image1"] ? req.files["image1"][0].path : null;
    const image2 = req.files["image2"] ? req.files["image2"][0].path : null;

    const project = new Project({
      title,
      description,
      candidate,
      image1,
      image2,
    });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateScore = async (req, res) => {
  try {
    const { imageOpened } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (
      project.score !== 100 &&
      (project.openedImage === "" || project.openedImage === imageOpened)
    ) {
      project.score = 50;
      project.status = "Accepted";
    } else {
      project.score = 100;
      project.status = "Completed";
    }

    project.openedImage = imageOpened;

    await project.save();
    res.status(200).json({ message: "Score updated", score: project.score });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating score", error: err.message });
  }
};
