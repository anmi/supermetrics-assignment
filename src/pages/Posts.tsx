import React, { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { ERROR_CODES } from "../api/supermetrics.types";
import { AuthorsList } from "../components/AuthorsList/AuthorsList";
import { PostsLayout } from "../components/PostsLayout/PostsLayout";
import { PostsList } from "../components/PostsList/PostsList";
import { isFailure, isInitial, isSuccess } from "../store/Loadable";
import { loadPosts, useAppDispatch, useAppSelector } from "../store/store";

export const PostsPage: React.FC = () => {
  const postsStore = useAppSelector((a) => a.posts);
  const authStatus = useAppSelector((a) => a.authStatus);
  const dispatch = useAppDispatch();
  const isTokenInvalid =
    !isSuccess(authStatus) ||
    (isFailure(postsStore) &&
      postsStore.error.code === ERROR_CODES.invalidSlToken);
  const params = useParams<{ authorId?: string }>();
  const currentAuthorId = params.authorId || null;

  useEffect(() => {
    if (isInitial(postsStore) && isSuccess(authStatus)) {
      dispatch(loadPosts())
    }
  }, [postsStore, dispatch, authStatus]);

  if (isTokenInvalid) {
    return <Navigate to={"/login"} />;
  }

  if (isFailure(postsStore)) {
    return <div>Something went wrong</div>
  }

  if (isSuccess(postsStore)) {
    const { authorsList, authors, postsByAuthors, posts } = postsStore.value;
    return (
      <PostsLayout
        left={
          <AuthorsList
            items={authorsList.map((id) => ({
              author: authors[id],
              total: postsByAuthors[id].length,
            }))}
            activeId={currentAuthorId}
          />
        }
      >
        {currentAuthorId !== null && (
          <PostsList
            posts={postsByAuthors[currentAuthorId].map(
              (postId) => posts[postId]
            )}
          />
        )}
      </PostsLayout>
    );
  }

  return <div>Loading...</div>
};
