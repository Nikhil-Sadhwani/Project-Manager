"use client";

import React, { useEffect, useState } from "react";
import AddProject from "../components/AddProject";
import ProjectList from "../components/ProjectList";
import { getProjects } from "../services/projectService";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [isAddProjectVisible, setAddProjectVisible] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const response = await getProjects();
    setProjects(response.data);
  };

  const toggleAddProject = () => {
    setAddProjectVisible(!isAddProjectVisible);
  };

  const handleProjectSubmitted = () => {
    setAddProjectVisible(false);
    fetchProjects();
  };

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={toggleAddProject}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add Project
      </button>

      {isAddProjectVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg relative">
            <button
              onClick={toggleAddProject}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>
            <AddProject refreshProjects={handleProjectSubmitted} />
          </div>
        </div>
      )}
      <ProjectList projects={projects} refreshProjects={fetchProjects} />
    </div>
  );
}
