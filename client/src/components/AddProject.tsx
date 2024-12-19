import React, { useState } from "react";
import { addProject } from "../services/projectService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProject = ({ refreshProjects }: { refreshProjects: () => void }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    candidate: "",
    image1: null as File | null,
    image2: null as File | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("candidate", form.candidate);

    if (form.image1) {
      formData.append("image1", form.image1);
    }
    if (form.image2) {
      formData.append("image2", form.image2);
    }

    await addProject(formData);
    toast.success("Project created successfully !!");

    setForm({
      title: "",
      description: "",
      candidate: "",
      image1: null,
      image2: null,
    });
    refreshProjects();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h1 className="text-xl font-bold text-black">Create New Project</h1>
      <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="block w-full p-2 border rounded mb-4 text-black"
      />
      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="block w-full p-2 border rounded mb-4 text-black"
      ></textarea>
      <input
        type="text"
        placeholder="Candidate"
        value={form.candidate}
        onChange={(e) => setForm({ ...form, candidate: e.target.value })}
        className="block w-full p-2 border rounded mb-4 text-black"
      />
      <div className="mb-4">
        <label className="block mb-2 text-black">Upload Image 1</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setForm({
              ...form,
              image1: e.target.files ? e.target.files[0] : null,
            })
          }
          className="block w-full p-2 border rounded text-black bg-white"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-black">Upload Image 2</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setForm({
              ...form,
              image2: e.target.files ? e.target.files[0] : null,
            })
          }
          className="block w-full p-2 border rounded text-black bg-white"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Confirm
      </button>
    </form>
  );
};

export default AddProject;
