import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {fetchPostReset, fetchPostRequest, deletePostRequest } from "../../store/actions/post/actions";
import { RootState } from "../../store/rootReducer";
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { IPost } from '../../store/actions/post/type';

function PostLists() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  // const { pending, posts, error } = useSelector(
  //   (state: RootState) => state.posts
  // );
  const  postData = useSelector(
      (state: RootState) => state.posts
    );
  function createPost() {
    navigate('/post');
  }
  function editPost(index:number) {
    navigate('/post/'+index);
  }
  function deletePost(post:IPost) {
    if(post.id){
      dispatch(deletePostRequest(post.id));
    }
  }
  useEffect(() => {
    if(postData.isDeleted){
      dispatch(fetchPostReset());
      dispatch(fetchPostRequest());
    }
  }, [postData.isDeleted]);
  useEffect(() => {
    dispatch(fetchPostRequest());
  }, []);



  return (
    <div className="container">
      <Button variant="outline-primary" onClick={createPost}>Add</Button>
      {postData.pending ? (
        <div>Loading...</div>
      ) : postData.error ? (
        <div>Error</div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {postData.posts?.map((post, index) => (
              <tr key={post.id}>
                <td>{++index}</td>
                <td>
                  {post.title}
                </td>
                <td>
                <Button variant="outline-primary" onClick={() => editPost(index)}>Edit</Button>
                <Button variant="outline-primary" onClick={() => deletePost(post)}>Delete</Button>
                </td>

              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
export default PostLists;