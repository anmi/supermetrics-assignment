import React from "react";
import { Link } from "react-router-dom";
import { Author } from "../../store/PostsState";
import { classes } from "../../utils/classes";
import "./AuthorCard.css";

interface AuthorCardProps {
  author: Author;
  total: number;
  active: boolean;
}

export const AuthorCard: React.FC<AuthorCardProps> = ({
  author,
  total,
  active,
}) => {
  return (
    <Link
      to={`/authors/${author.id}/posts`}
      className={classes(["AuthorCard", active && "AuthorCard_active"])}
    >
      <div className="AuthorCard__name">{author.name}</div>
      <div className="AuthorCard__total">{total}</div>
    </Link>
  );
};
