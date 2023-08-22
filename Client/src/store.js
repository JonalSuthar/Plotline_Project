import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk"; // Import Redux Thunk
import { userLoginReducer } from "./reducer/userReducer";

const userInfoFromStorage = localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null
// export const AuthContext = createContext(userInfoFromStorage);

const reducer = combineReducers({
    userLogin: userLoginReducer,
  });
  
  const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
  };
  
  const store = createStore(reducer, initialState, applyMiddleware(thunk)); // Add applyMiddleware with Redux Thunk
  
  export default store;
  