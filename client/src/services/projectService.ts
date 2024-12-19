import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("API_URL is not defined in environment variables");
}

export const getProjects = async () => await axios.get(API_URL);
export const addProject = async (data: FormData) =>
  await axios.post(`${API_URL}/add`, data, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });
export const updateProjectScore = async (data: object, projectId: string) =>
  await axios.put(`${API_URL}/${projectId}/score`, data);
