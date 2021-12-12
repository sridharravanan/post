import { FormikProps, withFormik } from 'formik';
import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { IPost } from '../../store/actions/post/type';
import { Container, Form, Button } from 'react-bootstrap';
import { submitPostRequest } from "../../store/actions/post/actions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { useParams,useNavigate } from 'react-router-dom';
import { initialState } from "../../store/reducers/post/formReducer";

function PostFrom() {
  let navigate = useNavigate();
  const params = useParams()

  const dispatch = useDispatch();
  const { pending, post, error } = useSelector(
    (state: RootState) => state.submit
  );
  const { posts } = useSelector(
    (state: RootState) => state.posts
  );
  const [postValue, setPost] = useState<IPost>(initialState.post);

  useEffect(() => {

    console.log(posts);
    if (params.index) {
      //posts

      let indexValue: number = parseInt(params.index);
      let post = posts[indexValue];
      if (post) {
        setPost(post);
      }
    }
  }, [posts]);
  function postList() {
    navigate('/');
  }
  async function insertStudentAsync(value: IPost) {
    dispatch(submitPostRequest(value));
  
  }
  interface intialValue {
    postValue: IPost;
  }
  
  
  const InnerForm = (props: FormikProps<IPost>) => (
    <Container>
      <Form onSubmit={props.handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title"
            placeholder="Title"
            type="text"
            className="form-control"
            onChange={props.handleChange}
            value={props.values.title} />
          <Form.Text className="text-danger">
            {props.touched.title && props.errors.title &&
              <div>{props.errors.title}</div>}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label>Body</Form.Label>
          <Form.Control as="textarea"
            name="body"
            placeholder="Body"
            type="text"
            className="form-control"
            onChange={props.handleChange}
            value={props.values.body} />
          <Form.Text className="text-danger">
            {props.touched.body && props.errors.body &&
              <div>{props.errors.body}</div>}
          </Form.Text>
        </Form.Group>
  
  
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
  
    </Container>
  );
  
  const PostFormView = withFormik<intialValue, IPost>({
    enableReinitialize: true,
    mapPropsToValues: (props) => ({
      title: props.postValue.title ?? "",
      body: props.postValue.body ?? "",
      id: props.postValue.id ?? 0,
      userId: props.postValue.userId ?? 0,
    }),
    validationSchema: Yup.object().shape({
      title: Yup.string()
        .required('Please input title'),
      body: Yup.string()
        .required('Please input body'),
    },
    ),
    handleSubmit: (values, { setSubmitting }) => {
      console.log(values);
      insertStudentAsync(values)
    },
  })(InnerForm);

  return (
    <div className="container">
      <Button variant="outline-primary" onClick={postList}>Back</Button>
      <h1>{postValue && postValue.id ? "Edit " : "Add "}Post</h1>
      <PostFormView postValue={postValue} />
    </div>
  );
}

export default PostFrom;