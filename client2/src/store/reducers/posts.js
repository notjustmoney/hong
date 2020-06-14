const posts = (state = [], action) => {
  switch (action.type) {
    case "SET_POSTS":
      return [...state, ...action.info];
    case "DELETE_POSTS":
      return [];
    default:
      return state;
  }
};

export default posts;
