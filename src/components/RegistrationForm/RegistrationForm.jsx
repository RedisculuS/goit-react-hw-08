import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import css from './RegistrationForm.module.css';

const RegistrationSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Name is too short').required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(6, 'Password is too short').required('Required'),
});

const RegistrationForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(register(values));
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={RegistrationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <div>
            <label htmlFor="name">Name</label>
            <Field type="text" name="name" className={css.field}/>
            <ErrorMessage name="name" component="div" className={css.error}/>
          </div>
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
            Register
          </button>
        </Form>
      )}
    </Formik>
  );
};


export default RegistrationForm;
