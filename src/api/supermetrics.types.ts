import { Result } from "../store/Loadable";

export interface ResponseWithMeta<T> {
  data: T;
  meta: {
    request_id: string;
  };
}

export interface RegisterParams {
  email: string;
  name: string;
}

interface RegisterResponseBody {
  client_id: string;
  email: string;
  sl_token: string;
}

export type RegisterResponse = Result<ResponseWithMeta<RegisterResponseBody>, null>;

export interface PostsParams {
  slToken: string;
  page: number;
}

export interface PostDto {
  created_time: string;
  from_id: string;
  from_name: string;
  id: string;
  message: string;
  type: "status";
}

export interface PostsResponse {
  page: number;
  posts: PostDto[];
}

export const API_ERROR_CODES = {
  invalidSlToken: "Invalid SL Token",
};

export enum ERROR_CODES {
  invalidSlToken = "invalidSlToken",
  other = "other",
}

export interface RequestError {
  code: ERROR_CODES;
}

export type GetPostsResponse = Result<ResponseWithMeta<PostsResponse>, RequestError>;

