const setPosts = (info) => {
  return {
    type: "SET_POSTS",
    info,
  };
};

const deletePosts = () => {
  return {
    type: "DELETE_POSTS",
  };
};

export default { setPosts, deletePosts };
