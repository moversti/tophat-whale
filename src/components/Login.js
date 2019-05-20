import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import firebase from '../firebase';

function createUser(email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

export default function Login() {
  return <div>Login</div>;
}
