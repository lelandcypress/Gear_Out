import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { MUTATION_ADD_USER, MUTATION_LOGIN } from '../utils/mutations';
import Auth from '../utils/auth-client';
const LoginSignup = () => {

    /* LOGIN LOGIC */
    const [loginUserFormData, setLoginUserFormData] = useState({ email: '', password: '' });
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
          }
        });
  
        const { token, user } = response.data.login;
        Auth.login(token);
      } catch (err) {
        console.error(err);
      }
  
      setLoginUserFormData({
        email: '',
        password: '',
      });
    };

    /* SIGNUP LOGIC */
    const [signupUserFormData, setSignupUserFormData] = useState({ username: '', email: '', password: '' });
    const [signUp] = useMutation(MUTATION_ADD_USER);
  
    const handleSignupInputChange = (event) => {
      const { name, value } = event.target;
      setSignupUserFormData({ ...signupUserFormData, [name]: value });
    };
  
    const handleSignupFormSubmit = async (event) => {
      event.preventDefault();
  
      try {
  
        console.log(signupUserFormData);
  
        const response = await signUp({
          variables: {
            username: signupUserFormData.username,
            email: signupUserFormData.email,
            password: signupUserFormData.password,
          }
        });
  
        const { token, user } = response.data.addUser;
        Auth.login(token);
      } catch (err) {
        console.error(err);
      }
  
      setSignupUserFormData({
        username: '',
        email: '',
        password: '',
      });
    };

    return (
        <>
            <span>
                <div>
                <form onSubmit={handleLoginFormSubmit}>
                        <fieldset>
                            <legend>Log In</legend>
                            <label htmlFor='email'>Email</label>
                            <input
                                type='email'
                                placeholder='Your email address'
                                name='email'
                                onChange={handleLoginInputChange}
                                value={loginUserFormData.email}
                                required
                            />
                            <label htmlFor='password'>Password</label>
                            <input
                                type='password'
                                placeholder='Your password'
                                name='password'
                                onChange={handleLoginInputChange}
                                value={loginUserFormData.password}
                                required
                            />
                            <button
                                disabled={!(loginUserFormData.email && loginUserFormData.password)}
                                type='submit'
                                variant='success'
                            >
                            Submit
                            </button>
                        </fieldset>
                    </form>
                </div>
            </span>
            <span>
                <div>
                    <form onSubmit={handleSignupFormSubmit}>
                        <fieldset>
                            <legend>Sign Up</legend>
                            <label htmlFor="username">Username</label>
                            <input
                                type='text'
                                placeholder='Your username'
                                name='username'
                                onChange={handleSignupInputChange}
                                value={signupUserFormData.username}
                                required
                            />
                            <label htmlFor='email'>Email</label>
                            <input
                                type='email'
                                placeholder='Your email address'
                                name='email'
                                onChange={handleSignupInputChange}
                                value={signupUserFormData.email}
                                required
                            />
                            <label htmlFor='password'>Password</label>
                            <input
                                type='password'
                                placeholder='Your password'
                                name='password'
                                onChange={handleSignupInputChange}
                                value={signupUserFormData.password}
                                required
                            />
                            <button
                                disabled={!(signupUserFormData.username && signupUserFormData.email && signupUserFormData.password)}
                                type='submit'
                                variant='success'
                            >
                            Submit
                            </button>
                        </fieldset>
                    </form>
                </div>
            </span>
        </>
    );
}

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