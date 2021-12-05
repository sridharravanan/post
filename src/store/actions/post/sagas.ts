import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";

import { fetchPostFailure, fetchPostSuccess } from "./actions";
import { FETCH_POST_REQUEST } from "./actionType";
import { IPost } from "./type";
import { appUrl } from '../../../config/constant'
const getPosts = () =>
  axios.get<IPost[]>(appUrl+'/posts');

/*
  Worker Saga: Fired on FETCH_POST_REQUEST action
*/
function* fetchPostSaga():any {
  try {
    const response = yield call(getPosts);
    yield put(
        fetchPostSuccess({
        posts: response.data,
      })
    );
  } catch (e) {
    yield put(
      fetchPostFailure({
        error: "S",
      })
    );
  }
}

/*
  Starts worker saga on latest dispatched `FETCH_POST_REQUEST` action.
  Allows concurrent increments.
*/
function* postSaga() {
  yield all([takeLatest(FETCH_POST_REQUEST, fetchPostSaga)]);
}

export default postSaga;