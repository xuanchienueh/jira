import axios from "axios";
import { DOMAIN_API, TokenCybersoft, TOKEN_JIRA } from "../utils/config";

export const Post = (url = "", data) => {
  return axios({
    method: "POST",
    url: `${DOMAIN_API}/${url}`,
    data: data,
    headers: { TokenCybersoft, Authorization: `Bearer ${localStorage.getItem(TOKEN_JIRA)}` },
  });
};

export const Get = (url = "") => {
  return axios({
    method: "GET",
    url: `${DOMAIN_API}/${url}`,
    headers: { TokenCybersoft, Authorization: `Bearer ${localStorage.getItem(TOKEN_JIRA)}` },
  });
};

export const Delete = (url) =>
  axios({
    method: "DELETE",
    url: `${DOMAIN_API}/${url}`,
    headers: { TokenCybersoft, Authorization: `Bearer ${localStorage.getItem(TOKEN_JIRA)}` },
  });

export const Put = (url, model) =>
  axios({
    method: "PUT",
    url: `${DOMAIN_API}/${url}`,
    data: model,
    headers: { TokenCybersoft, Authorization: `Bearer ${localStorage.getItem(TOKEN_JIRA)}` },
  });
