import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  PostDto,
  PostsResponse,
  RequestError,
  ResponseWithMeta,
} from "../api/supermetrics.types";
import { api } from '../api/supermetrics';
import { getPosts } from "../api/supermetrics";
import { isSuccess, Loadable, loading, mapLoadable } from "./Loadable";
import {
  Author,
  AuthorId,
  Authors,
  createAppState,
  Post,
  Posts,
  PostsByAuthors,
  PostsState,
  SlToken,
} from "./PostsState";

export const updatePosts = createAction<
  Loadable<ResponseWithMeta<PostsResponse>, RequestError>,
  "updatePosts"
>("updatePosts");

export const updateToken2 = createAction<Loadable<SlToken, null>>("updateToken2");

function postDtoToLocal(post: PostDto): Post {
  return {
    id: post.id,
    authorId: post.from_id,
    message: post.message,
    createdTimestamp: new Date(post.created_time).valueOf(),
  };
}

function postDtoToAuthor(post: PostDto): Author {
  return {
    id: post.from_id,
    name: post.from_name,
  };
}

function postsResponseToLocal(resp: PostsResponse): PostsState {
  let posts: Posts = {};
  let authors: Authors = {};
  let authorsList: AuthorId[] = [];
  let postsByAuthors: PostsByAuthors = {};

  resp.posts.forEach((post) => {
    posts[post.id] = postDtoToLocal(post);
    if (!authors[post.from_id]) {
      authors[post.from_id] = postDtoToAuthor(post);
      authorsList.push(post.from_id);
      postsByAuthors[post.from_id] = [];
    }
    postsByAuthors[post.from_id].push(post.id);
  });

  authorsList.sort((a, b) => (authors[a].name > authors[b].name ? 1 : -1));

  Object.entries(postsByAuthors).forEach(([, ids]) => {
    ids.sort((a, b) =>
      posts[a].createdTimestamp < posts[b].createdTimestamp ? 1 : -1
    );
  });

  return {
    posts,
    authors,
    authorsList,
    postsByAuthors,
  };
}

const reducer = createReducer(
  createAppState({
    slToken: localStorage.getItem("sltoken"),
  }),
  (builder) =>
    builder
      .addCase(updatePosts, (state, action) => {
        return {
          ...state,
          posts: mapLoadable(action.payload, (r) =>
            postsResponseToLocal(r.data)
          ),
        };
      })
      .addCase(updateToken2, (state, { payload: slToken }) => {
        if (isSuccess(slToken)) {
          localStorage.setItem("sltoken", slToken.value);
        }
        return {
          ...state,
          authStatus: slToken,
        };
      })
);

export const loadPosts =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const authStatus = getState().authStatus;
    if (!authStatus || !isSuccess(authStatus)) {
      return;
    }
    dispatch(updatePosts(loading));
    getPosts({
      page: 0,
      slToken: authStatus.value,
    }).then((result) => {
      dispatch(updatePosts(result));
    });
  };

export const registerAction = 
  (params: { email: string, name: string, onSuccess: () => void }) => (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(updateToken2(loading));
    api.register(params).then(result => {
      if (isSuccess(result)) {
        localStorage.setItem('slToken', result.value.data.sl_token)
        params.onSuccess();
      }
      dispatch(updateToken2(mapLoadable(result, r => r.data.sl_token)))
    })
  }

export const store = configureStore({
  reducer,
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
