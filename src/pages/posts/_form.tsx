import { FormikProps, withFormik } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';
import { IPost } from '../../store/actions/post/type';
import { Container, Form, Button } from 'react-bootstrap';
import { submitPostRequest } from "../../store/actions/post/actions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";


interface FormProps {
  login?: string;
}



function Basic() {
  const dispatch = useDispatch();
  const { pending, post, error } = useSelector(
    (state: RootState) => state.submit
  );


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
          <Form.Label>Password</Form.Label>
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

  const UserSearchForm = withFormik<FormProps, IPost>({
    mapPropsToValues: () => ({
      userId: 0,
      id: 0,
      title: "",
      body: ""
    }),
    validationSchema: Yup.object().shape({
      title: Yup.string()
        .max(16, 'Please input 16 characters or less')
        .required('Please input title'),
      body: Yup.string()
        .max(16, 'Please input 16 characters or less')
        .required('Please input title'),
    },
    ),
    handleSubmit: (values, { setSubmitting }) => {
      insertStudentAsync(values)
    },
  })(InnerForm);

  async function insertStudentAsync(value: IPost) {

    dispatch(submitPostRequest(value));
  }
  return (
    <div>
      <h1>My App</h1>
      <p>This can be anywhere in your application</p>
      <UserSearchForm />
    </div>
  );
}

export default Basic;