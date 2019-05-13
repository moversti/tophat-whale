import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import firebase from '../firebase';
import { ProductContext } from '../context';

function sendContact(values, reset) {
  let ref = firebase.database().ref('contact');
  const contactItem = {
    nimi: values.nimi,
    email: values.email,
    palaute: values.palaute
  };
  return ref.push(contactItem);
}

class ContactFormik extends React.Component {
  render() {
    return (
      <div className="container">
        <h4 className="my-3">Ota yhteyttä</h4>
        <Formik
          initialValues={{ nimi: '', email: '', palaute: '' }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            sendContact(values).then(() => {
              setSubmitting(false);
              resetForm();
              this.context.setMessage('Palaute lähetetty!');
              this.props.history.push('/');
            });
          }}
          validationSchema={Yup.object().shape({
            nimi: Yup.string().required('Pakollinen'),
            email: Yup.string().email('Tarkista email'),
            palaute: Yup.string().required('Pakollinen')
          })}
        >
          {props => {
            const {
              values,
              touched,
              errors,
              dirty,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset
            } = props;
            return (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="nimi">Nimi</label>
                  <input
                    id="nimi"
                    name="nimi"
                    className={(() => {
                      let classes = 'form-control';
                      if (errors.nimi) {
                        classes = classes + ' is-invalid';
                      } else if (touched.nimi) {
                        classes = classes + ' is-valid';
                      }
                      return classes;
                    })()}
                    type="text"
                    placeholder="Nimesi"
                    value={values.nimi}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.nimi && touched.nimi && (
                    <div className="invalid-feedback">{errors.nimi}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    className={(() => {
                      let classes = 'form-control';
                      if (errors.email) {
                        classes = classes + ' is-invalid';
                      } else if (touched.email) {
                        classes = classes + ' is-valid';
                      }
                      return classes;
                    })()}
                    type="text"
                    placeholder="sinun@email.fi"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="palaute">Palautteesi</label>
                  <textarea
                    id="palaute"
                    name="palaute"
                    className={(() => {
                      let classes = 'form-control';
                      if (errors.palaute) {
                        classes = classes + ' is-invalid';
                      } else if (touched.palaute) {
                        classes = classes + ' is-valid';
                      }
                      return classes;
                    })()}
                    type="text"
                    value={values.palaute}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.palaute && touched.palaute && (
                    <div className="invalid-feedback">{errors.palaute}</div>
                  )}
                </div>
                <button
                  type="button"
                  className="btn btn-danger mx-2"
                  onClick={handleReset}
                  disabled={!dirty || isSubmitting}
                >
                  Tyhjennä
                </button>
                <button
                  className="btn btn-primary mx-2"
                  type="submit"
                  disabled={
                    isSubmitting ||
                    errors.nimi ||
                    errors.email ||
                    errors.palaute
                  }
                >
                  Lähetä
                </button>
              </form>
            );
          }}
        </Formik>
      </div>
    );
  }
}

ContactFormik.contextType = ProductContext;
export default ContactFormik;
