import React, { useState } from "react";
import { Author, AuthorId } from "../../store/PostsState";
import { matchSearch } from "../../utils/matchSearch";
import { AuthorCard } from "../AuthorCard/AuthorCard";
import { DelayedInput } from "../DelayedInput/DelayedInput";
import "./AuthorsList.css";

interface AuthorWithCount {
  author: Author;
  total: number;
}

interface AuthorsListProps {
  items: AuthorWithCount[];
  activeId: AuthorId | null;
}

function matchAuthor(search: string) {
  return (item: AuthorWithCount) => matchSearch(search, item.author.name);
}

export const AuthorsList: React.FC<AuthorsListProps> = (props) => {
  const [search, setSearch] = useState("");

  return (
    <div className="AuthorsList">
      <DelayedInput
        value={search}
        onChange={setSearch}
        name={"search"}
        delay={200}
      />
      {props.items.filter(matchAuthor(search)).map((item) => (
        <AuthorCard
          active={props.activeId === item.author.id}
          author={item.author}
          total={item.total}
          key={item.author.id}
        />
      ))}
    </div>
  );
};
