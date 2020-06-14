import isOpen from "./isOpen";
import loginInfo from "./loginInfo";
import posts from "./posts";
import { combineReducers } from "redux";

const rootReducer = combineReducers({ isOpen, loginInfo, posts });

export default rootReducer;
