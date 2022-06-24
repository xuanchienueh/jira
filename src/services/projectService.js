import { Delete, Get, Post, Put } from "./baseServices";

export const createProjectSV = (infoProject) => Post("Project/createProjectAuthorize", infoProject);

export const getCategorySV = () => Get("ProjectCategory");

export const getAllProjectSV = (keyword = undefined) => {
  if (keyword) return Get(`Project/getAllProject?keyword=${keyword}`);

  return Get(`Project/getAllProject`);
};

export const deleteProjectSV = (idProject) => {
  return Delete(`Project/deleteProject?projectId=${idProject}`);
};

export const getDetailProjectSV = (idProject) => {
  return Get(`Project/getProjectDetail?id=${idProject}`);
};

export const updateProjectSV = (idProject, infoUpdate) => {
  return Put(`Project/updateProject?projectId=${idProject}`, infoUpdate);
};

export const assignUserProjectSv = (model = {}) => {
  return Post(`Project/assignUserProject`, model);
};

export const removeUserFromProjectSV = (model = { projectId: 0, userId: 0 }) => {
  return Post(`Project/removeUserFromProject`, model);
};
