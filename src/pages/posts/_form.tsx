import { FormikProps, withFormik } from 'formik';
import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { IPost } from '../../store/actions/post/type';
import { Container, Form, Button } from 'react-bootstrap';
import { submitPostRequest,submitPostReset } from "../../store/actions/post/actions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { useParams,useNavigate } from 'react-router-dom';
import { initialState } from "../../store/reducers/post/formReducer";
import SweetAlert from 'react-bootstrap-sweetalert';
import { Swal } from '../../config/swalAlert';
import { postSafeSuccessMessage } from '../../config/constant';

function PostFrom() {
  let navigate = useNavigate();
  const params = useParams()

  const dispatch = useDispatch();
  const { pending, post, error,isSuccess } = useSelector(
    (state: RootState) => state.submit
  );
  const { posts } = useSelector(
    (state: RootState) => state.posts
  );
  const [postValue, setPost] = useState<IPost>({ id: 0, userId: 0, title: "", body: "" });
  const [showSwal, setShowSwal] = useState(false);
  const [swalTitle, setSwalTitle] = useState('');
//#block for bind edit data...!
  useEffect(() => {
    if (params.index) {
      //posts
      let indexValue: number = parseInt(params.index);
      let post = posts[indexValue];
      if (post) {
        setPost(post);
      }
    }
  }, []);
  //#watcher for post after submit...!
  useEffect(() => {
    if( isSuccess ){
      setSwalTitle(postSafeSuccessMessage);  
      setShowSwal(true)
    }
    if( isSuccess === false){
      setSwalTitle(error);
      setShowSwal(true);
    }
  },[isSuccess]);

  const modalClose = () => {
    setShowSwal(false);
  };
  const onConfirm = ()=>{
    setShowSwal(false);
    //dispatch(submitPostReset());
  };

  function postList() {
    navigate('/');
  }
  function hideAlert() {
   console.log("ADDSas");
  }
  async function insertPostAsync(value: IPost) {
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
      insertPostAsync(values)
    },
  })(InnerForm);

  return (
    <div className="container">
      {showSwal ? (<Swal
          onCancel={onConfirm}
          onConfirm={onConfirm}
          title={swalTitle}
          showCancel={false}
          confirmBtnText="Ok"
          cancelBtnText="cancel"
          type="warning"
      ></Swal>): null}
      <Button variant="outline-primary" onClick={postList}>Back</Button>
      <h1>{postValue && postValue.id ? "Edit " : "Add "}Post</h1>
      <PostFormView postValue={postValue} />
    </div>
  );
}

export default PostFrom;