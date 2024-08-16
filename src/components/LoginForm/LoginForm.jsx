import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operations';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(6, 'Password is too short').required('Required'),
});

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(login(values));
    resetForm();
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
          </div>
          <button type="submit" disabled={isSubmitting}>
            Log In
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
