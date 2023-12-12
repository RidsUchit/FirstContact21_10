import axios from "axios";
import config from "../../constants/config";
import endpoints from "../../constants/endpoints";

export const getCommentListByPostId = async (
  postId,
  successCallback,
  errorCallback
) => {
  try {
    await axios
      .get(`${config?.base_url}${endpoints?.COMMENT_LIST}${postId}`)
      .then((res) => {
        successCallback(res.data);
      });
  } catch (error) {
    console.error("error ===>", error);
    errorCallback(error);
  }
};

export const postCommentByPostId = async (
  comment,
  successCallback,
  errorCallback
) => {
  console.log(
    "commentcomment",
    comment,
    `${config?.base_url}${endpoints?.ADD_COMMENT}`
  );
  try {
    await axios
      .post(`${config?.base_url}${endpoints?.ADD_COMMENT}`, comment)
      .then((res) => {
        successCallback(res.data);
      });
  } catch (error) {
    console.error("error ===>", error);
    errorCallback(error);
  }
};
