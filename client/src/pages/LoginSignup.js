import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { MUTATION_ADD_USER, MUTATION_LOGIN } from "../utils/mutations";
import SignupModal from "../components/SignupModal";
import Auth from "../utils/auth-client";

const LoginSignup = () => {
  // MODAL LOGIC
  const [modalShow, setModalShow] = useState(false);

  /* LOGIN LOGIC */
  const [loginUserFormData, setLoginUserFormData] = useState({
    email: "",
    password: "",
  });
  const [logIn] = useMutation(MUTATION_LOGIN);

  const handleLoginInputChange = (event) => {
    const { name, value } = event.target;
    setLoginUserFormData({ ...loginUserFormData, [name]: value });
  };

  const handleLoginFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await logIn({
        variables: {
          email: loginUserFormData.email,
          password: loginUserFormData.password,
        },
      });

      const { token, user } = response.data.login;
      Auth.login(token);
    } catch (err) {
      console.error(err);
    }

    setLoginUserFormData({
      email: "",
      password: "",
    });
  };

  /* SIGNUP LOGIC */

  return (
    <>
      <section className="vh-100">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6 text-black">
              <div className="px-5 ms-xl-4">
                <i className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4"></i>
              </div>

              <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                <form className="main-form" onSubmit={handleLoginFormSubmit}>
                  <h3 className="fw-normal mb-3 pb-3 letter-spacing">Log in</h3>

                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      name="email"
                      className="form-control form-control-lg"
                      onChange={handleLoginInputChange}
                      value={loginUserFormData.email}
                    />
                    <label className="form-label" for="form2Example18">
                      Email address
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      name="password"
                      className="form-control form-control-lg"
                      onChange={handleLoginInputChange}
                      value={loginUserFormData.password}
                    />
                    <label className="form-label" for="form2Example28">
                      Password
                    </label>
                  </div>

                  <div className="pt-1 mb-4">
                    <button
                      className="btn btn-info btn-lg btn-block"
                      variant="success"
                      type="submit"
                      disabled={
                        !(loginUserFormData.email && loginUserFormData.password)
                      }
                    >
                      Login
                    </button>
                  </div>
                  <p>
                    Don't have an account?{" "}
                    <a
                      href="#!"
                      className="link-info"
                      onClick={() => setModalShow(true)}
                    >
                      Register here
                    </a>
                  </p>
                  <SignupModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />
                </form>
              </div>
            </div>
            <div className="col-sm-6 px-0 d-none d-sm-block">
              <img
                alt="Login image"
                src="./images/login-bg.jpg"
                className="w-100 vh-100 big-img"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginSignup;

/*
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
// import { createUser } from '../utils/API';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const [signUp] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {

      console.log(userFormData);

      const response = await signUp({
        variables: {
          username: userFormData.username,
          email: userFormData.email,
          password: userFormData.password,
        }
      });

      // const response = await createUser(userFormData);

      // if (!response.ok) {
      //   throw new Error('something went wrong!');
      // }

      const { token, user } = response;
      console.log(user);
      Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <>
      {/* This is needed for the validation functionality above /}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad /}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert>

        <Form.Group>
          <Form.Label htmlFor='username'>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your username'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Your email address'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.username && userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignupForm;

*/
