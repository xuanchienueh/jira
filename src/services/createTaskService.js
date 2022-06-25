import { Get } from "./baseServices";

export const getAllPrioritySV = (priorityId = null) => {
  if (priorityId) {
    return Get(`Priority/getAll?id=${priorityId}`);
  }
  return Get(`Priority/getAll`);
};
