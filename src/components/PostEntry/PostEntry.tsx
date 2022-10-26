import React from "react";
import { Post } from "../../store/PostsState";
import { classes } from "../../utils/classes";
import { formatDate } from "../../utils/formatDate";
import "./PostEntry.css";

interface PostEntryProps {
  post: Post;
  className?: string
}

export const PostEntry: React.FC<PostEntryProps> = ({ post, className }) => {
  return (
    <div className={classes(["PostEntry", className])}>
      <div className="PostEntry__date">{formatDate(post.createdTimestamp)}</div>
      <div className="PostEntry__title">{post.message}</div>
    </div>
  );
};
