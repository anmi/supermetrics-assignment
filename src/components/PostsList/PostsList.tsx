import React, { useCallback, useMemo, useState } from "react";
import { Post } from "../../store/PostsState";
import { matchSearch } from "../../utils/matchSearch";
import { Button } from "../Button/Button";
import { DelayedInput } from "../DelayedInput/DelayedInput";
import { PostEntry } from "../PostEntry/PostEntry";
import "./PostsList.css";

interface PostsListProps {
  posts: Post[];
}

function sortAndFilter(isAsc: boolean, search: string, posts: Post[]): Post[] {
  let result: Post[] = [];
  for (let i = 0; i < posts.length; i++) {
    const post = posts[isAsc ? i : posts.length - i - 1];

    if (matchSearch(search, post.message)) {
      result.push(post)
    }
  }

  return result;
}

export const PostsList: React.FC<PostsListProps> = (props) => {
  const [search, setSearch] = useState("");
  const [isAsc, setIsAsc] = useState(true);
  const handleUpClick = useCallback(() => {
    setIsAsc(true);
  }, []);
  const handleDownClick = useCallback(() => {
    setIsAsc(false);
  }, []);
  const posts = useMemo(() => sortAndFilter(isAsc, search, props.posts), [isAsc, search, props.posts])

  return (
    <div className="PostsList">
      <div className="PostsList__controls">
        <div className="PostsList__sort">
          <Button
            onClick={handleUpClick}
            active={isAsc}
            className="PostsList__sortButton"
          >
            &uarr;
          </Button>
          <Button
            onClick={handleDownClick}
            active={!isAsc}
            className="PostsList__sortButton"
          >
            &darr;
          </Button>
        </div>
        <DelayedInput
          value={search}
          onChange={setSearch}
          name="search"
          delay={200}
        />
      </div>
      {posts.map((post) => (
        <PostEntry post={post} key={post.id} className="PostsList__entry" />
      ))}
    </div>
  );
};
