import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operations';
import css from './LoginForm.module.css'

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
        <Form className={css.form}>
          <div>
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" className={css.field}/>
            <ErrorMessage name="email" component="div" className={css.error}/>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Field type="password" name="password" className={css.field}/>
            <ErrorMessage name="password" component="div" className={css.error}/>
          </div>
          <button type="submit" disabled={isSubmitting} className={css.sumbitBtn}> 
            Log In
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
