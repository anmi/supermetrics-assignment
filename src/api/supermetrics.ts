import { failure, success } from "../store/Loadable";
import { PostsParams, GetPostsResponse, API_ERROR_CODES, ERROR_CODES, RegisterParams, RegisterResponse } from "./supermetrics.types";


export function getPosts(params: PostsParams) {
  const urlParams = new URLSearchParams({
    page: params.page.toString(),
    sl_token: params.slToken,
  });

  return fetch(
    "https://api.supermetrics.com/assignment/posts?" + urlParams
  ).then(
    (r) => {
      if (r.ok) {
        return r.json().then(success) as Promise<GetPostsResponse>;
      } else {
        return r.json().then((r) => {
          if (r.error && r.error.code === API_ERROR_CODES.invalidSlToken) {
            return failure({
              code: ERROR_CODES.invalidSlToken,
            });
          } else {
            return failure({
              code: ERROR_CODES.other,
            });
          }
        }) as Promise<GetPostsResponse>;
      }
    },
    () => {
      return failure({
        code: ERROR_CODES.other,
      }) as GetPostsResponse;
    }
  );
}


export function register(params: RegisterParams) {
  const formData = new FormData();
  formData.set("name", params.name);
  formData.set("email", params.email);
  formData.set("client_id", "ju16a6m81mhid5ue1z3v2g0uh");
  return fetch("https://api.supermetrics.com/assignment/register", {
    method: "post",
    body: formData,
  })
    .then(
      r => {
        if (r.ok) {
          return r.json().then(success) as Promise<RegisterResponse>;
        } else {
          return failure(null);
        }
      },
      () => {
        return failure(null);
      }
    );
}

export const api = {
  register,
  getPosts
};
