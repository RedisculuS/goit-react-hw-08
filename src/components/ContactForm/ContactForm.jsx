import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addContact } from '../../redux/contacts/operations'; 
import css from './ContactForm.module.css';

export default function ContactForm() {
  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    number: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    number: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });

  const handleSubmit = (values, actions) => {
    dispatch(addContact({
      name: values.name,
      number: values.number,
    }));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div>
          <label htmlFor="name">Name</label>
          <div>
            <Field type="text" id="name" name="name" className={css.field} />
          </div>
          <ErrorMessage name="name" component="div" className={css.error} />
        </div>
        <div>
          <label htmlFor="number">Number</label>
          <div>
            <Field type="text" id="number" name="number" className={css.field} />
          </div>
          <ErrorMessage name="number" component="div" className={css.error} />
        </div>
        <button type="submit" className={css.sumbitBtn}>
          Add contact
        </button>
      </Form>
    </Formik>
  );
}
