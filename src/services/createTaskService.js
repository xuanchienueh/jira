import { Get, Post } from "./baseServices";

export const getAllPrioritySV = (priorityId = null) => {
  if (priorityId) {
    return Get(`Priority/getAll?id=${priorityId}`);
  }
  return Get(`Priority/getAll`);
};

export const getAllTaskTypeSV = () => {
  return Get(`TaskType/getAll`);
};

export const createTaskSV = (data) => {
  return Post(`Project/createTask`, data);
};
