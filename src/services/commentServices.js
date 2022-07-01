import { Delete, Post, Put } from "./baseServices";

export const insertCommentSV = (valueCmt) => {
  return Post("Comment/insertComment", valueCmt);
};

export const deleteCommentSV = (idComment) => {
  return Delete(`Comment/deleteComment?idComment=${idComment}`);
};

export const updateCommentSV = (idComment, valueCmt) => {
  return Put(`Comment/updateComment?id=${idComment}&contentComment=${valueCmt}`);
};
