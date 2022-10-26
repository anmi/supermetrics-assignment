import { RequestError } from "../api/supermetrics.types";
import { initialLoadable, Loadable, success } from "./Loadable";

export type AuthorId = string;
export type SlToken = string;

export interface Author {
  id: AuthorId;
  name: string;
}

export interface Authors {
  [id: AuthorId]: Author;
}

export type PostId = string;

export interface Post {
  id: PostId;
  authorId: string;
  message: string;
  createdTimestamp: number;
}

export interface Posts {
  [id: PostId]: Post;
}

export interface PostsByAuthors {
  [id: AuthorId]: PostId[];
}

export interface PostsState {
  posts: Posts;
  authors: Authors;
  authorsList: AuthorId[];
  postsByAuthors: PostsByAuthors;
}

interface LoadablePostsState {
  posts: Loadable<PostsState, RequestError>;
  pageLoading: Loadable<null, null>;
  authStatus: Loadable<string, null>;
}

export function createAppState({
  slToken,
}: {
  slToken: string | null;
}): LoadablePostsState {
    console.log('sltoken', slToken)
  return {
    posts: initialLoadable,
    pageLoading: initialLoadable,
    authStatus: slToken ? success(slToken) : initialLoadable,
  };
}
