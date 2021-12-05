import { all, fork } from "redux-saga/effects";

import postSaga from "./actions/post/sagas";

export function* rootSaga() {
  yield all([fork(postSaga)]);
}