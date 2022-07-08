import { Get, Post } from "./baseServices";

export const loginService = (infoLogin) => Post("Users/signin", infoLogin);
export const registerService = (infoRegister) => Post("Users/signup", infoRegister);

export const getUserSV = (keyword = null) => {
  if (keyword) return Get(`Users/getUser?keyword=${keyword}`);
  return Get(`Users/getUser`);
};

export const getUserByProjectIdSV = (projectID) => {
  return Get(`Users/getUserByProjectId?idProject=${projectID}`);
};
