import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";

import { fetchPostFailure, fetchPostSuccess } from "./actions";
import { FETCH_POST_REQUEST, SUBMIT_POST_REQUEST } from "./actionType";
import { IPost, SubmitPostRequest } from "./type";
import { appUrl } from '../../../config/constant'


// AXIOS
const axiosClient = axios;
axiosClient.defaults.baseURL = appUrl;


const getPosts = () =>
  axios.get<IPost[]>(appUrl + '/posts');

/*
  Worker Saga: Fired on FETCH_POST_REQUEST action
*/
function* fetchPostSaga(): any {
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
const insertPostsAsync = async (body: IPost) => {
  return axiosClient.post(
    '/posts',
    body
  )
}
function* insertPostSaga(action: SubmitPostRequest) {
  try {
    // const postModel = get(action, 'args');

    yield call(insertPostsAsync, action.args);
    yield call(fetchPostSaga);
  } catch (ex: any) {
    const error = {
      type: ex.message, // something else can be configured here
      message: ex.message,
    };
    yield put(
      fetchPostFailure({
        error: "S",
      })
    );
  }
};

/*
  Starts worker saga on latest dispatched `FETCH_POST_REQUEST` action.
  Allows concurrent increments.
*/
function* postSaga() {
  yield all([takeLatest(FETCH_POST_REQUEST, fetchPostSaga)]);
  yield all([takeLatest(SUBMIT_POST_REQUEST, insertPostSaga)]);
}

export default postSaga;