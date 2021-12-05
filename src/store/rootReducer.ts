import { combineReducers } from "redux";

import  listReducer from "./reducers/post/listReducer";
import  formReducer from "./reducers/post/formReducer";

const rootReducer = combineReducers({
    posts : listReducer,
    submit : formReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;