import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchPostRequest } from "../../store/actions/post/actions";
import { RootState } from "../../store/rootReducer";
import { Table } from 'react-bootstrap';

function PostLists() {
  const dispatch = useDispatch();
  const { pending, posts, error } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    dispatch(fetchPostRequest());
  }, []);



  return (
    <div className="container">
      {pending ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error</div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
            </tr>
          </thead>
          <tbody>
            {posts?.map((post, index) => (
              <tr key={post.id}>
                <td>{++index}</td>
                <td>
                  {post.title}
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