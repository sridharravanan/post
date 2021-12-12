import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";

import { deletePostSuccess, fetchPostFailure, fetchPostSuccess } from "./actions";
import { FETCH_POST_REQUEST, SUBMIT_POST_REQUEST,DELETE_POST_REQUEST } from "./actionType";
import { IPost, SubmitPostRequest,DeletePostRequest } from "./type";
import { appUrl,defaultSucess,defaultErrorMessage } from '../../../config/constant'


// AXIOS
const axiosClient = axios;
axiosClient.defaults.baseURL = appUrl;


const getPosts = () =>
  axiosClient.get('/posts');
//axios.get<IPost[]>(appUrl + '/posts');
function getErrorMessage(error:any){
  let errorMessage:string = defaultErrorMessage;
  if( error){
    
  }
  return errorMessage;
}
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
  if (body && body.id) {
    return axiosClient.put(
      '/posts/' + body.id,
      body
    )
  }
  return axiosClient.post(
    '/posts',
    body
  )
}
function* insertPostSaga(action: SubmitPostRequest) {
  try {
    // const postModel = get(action, 'args');

    yield call(insertPostsAsync, action.args);
    
    //yield call(fetchPostSaga);
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
const deletePostAsync = async (id: Number) => {
  return axiosClient.delete(
    '/posts/'+id
  );
};
/**
 * 
 * @param action {type, payload: string[]}
 */
 function* deletePostSaga(action:DeletePostRequest):any {
  try {

      let responce = yield call(deletePostAsync, action.args);
      if(responce.status == defaultSucess){
        console.log(responce);
        yield put(deletePostSuccess());
      }else{
        let errorMessage = getErrorMessage(responce);
        yield put(fetchPostFailure({ error: errorMessage}));
    
      }
      

  } catch(error: any) {
      let errorMessage = getErrorMessage(error);
      yield put(fetchPostFailure({ error: errorMessage}));
  }
};
/*
  Starts worker saga on latest dispatched `FETCH_POST_REQUEST` action.
  Allows concurrent increments.
*/
function* postSaga() {
  yield all([takeLatest(FETCH_POST_REQUEST, fetchPostSaga)]);
  yield all([takeLatest(SUBMIT_POST_REQUEST, insertPostSaga)]);
  yield all([takeLatest(DELETE_POST_REQUEST, deletePostSaga)]);
}

export default postSaga;