import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchPostRequest } from "../../store/actions/post/actions";
import { RootState } from "../../store/rootReducer";

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
        posts?.map((post, index) => (
          <div key={post.id}>
            {++index}. {post.title}
          </div>
        ))
      )}
    </div>
  );
}
export default PostLists;