import React from "react";
import "./PostsLayout.css";

interface PostsLayoutProps {
  left: React.ReactNode;
  children: React.ReactNode;
}

export const PostsLayout: React.FC<PostsLayoutProps> = (props) => {
  return (
    <div className="PostsLayout">
      <div className="PostsLayout__left">{props.left}</div>
      <div className="PostsLayout__right">{props.children}</div>
    </div>
  );
};
