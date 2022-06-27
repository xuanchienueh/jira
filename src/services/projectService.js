import { Delete, Get, Post, Put } from "./baseServices";

export const createProjectSV = (infoProject) => Post("Project/createProjectAuthorize", infoProject);
export const getCategorySV = () => Get("ProjectCategory");
export const assignUserProjectSv = (model = {}) => Post(`Project/assignUserProject`, model);
export const getTaskDetailSV = (taskId) => Get(`Project/getTaskDetail?taskId=${taskId}`);
export const getDetailProjectSV = (idProject) => Get(`Project/getProjectDetail?id=${idProject}`);
export const updateStatusSV = (status) => Put(`Project/updateStatus`, status);
export const updatePrioritySV = (priority) => Put(`Project/updatePriority`, priority);
export const updateEstimateSV = (estimate) => Put(`Project/updateEstimate`, estimate);

export const getAllProjectSV = (keyword = undefined) => {
  if (keyword) return Get(`Project/getAllProject?keyword=${keyword}`);
  return Get(`Project/getAllProject`);
};

export const deleteProjectSV = (idProject) =>
  Delete(`Project/deleteProject?projectId=${idProject}`);

export const updateProjectSV = (idProject, infoUpdate) => {
  return Put(`Project/updateProject?projectId=${idProject}`, infoUpdate);
};

export const removeUserFromProjectSV = (model = { projectId: 0, userId: 0 }) => {
  return Post(`Project/removeUserFromProject`, model);
};
