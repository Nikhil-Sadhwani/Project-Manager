import React, { useState } from "react";
import { updateProjectScore } from "../services/projectService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Project {
  _id: string;
  title: string;
  description: string;
  status: string;
  candidate: string;
  score: number;
  image1?: string;
  image2?: string;
}

const ProjectList = ({
  projects,
  refreshProjects,
}: {
  projects: Project[];
  refreshProjects: () => void;
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageOpen = async (
    projectId: string,
    image: string,
    clickedImage: string
  ) => {
    try {
      setSelectedImage(image);

      setTimeout(async () => {
        const response = await updateProjectScore(
          {
            imageOpened: clickedImage,
          },
          projectId
        );
        refreshProjects();
        toast.success(`Score updated to ${response.data.score}`);
      }, 0);
    } catch (err) {
      console.error("Error updating score:", err);
    }
  };

  const handleClosePopup = () => {
    setSelectedImage(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Projects</h1>

      {projects.length === 0 ? (
        <div className=" flex items-center justify-center h-[70vh]">
          <h1 className="text-2xl font-bold">No Projects</h1>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <div key={project._id} className="p-4 border rounded shadow">
              <h2 className="text-xl font-semibold">{project.title}</h2>
              <p>{project.description}</p>
              <p>Status: {project.status}</p>
              <p>Candidate: {project.candidate}</p>
              <p>Score: {project.score}</p>
              <div className="mt-4">
                {project.image1 && (
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-2 mr-1"
                    onClick={() =>
                      handleImageOpen(project._id, project.image1!, "image1")
                    }
                  >
                    View Image 1
                  </button>
                )}
                {project.image2 && (
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded"
                    onClick={() =>
                      handleImageOpen(project._id, project.image2!, "image2")
                    }
                  >
                    View Image 2
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative">
            <img
              src={selectedImage}
              alt="Selected"
              className="max-w-screen h-screen rounded shadow-lg"
            />
            <button
              onClick={handleClosePopup}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
