import React from "react";
import { useSelector, useDispatch } from "react-redux";

const SearchByTags = () => {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  console.log(posts);
  return <div>Hello</div>;
};

export default SearchByTags;
