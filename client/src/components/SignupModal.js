import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { MUTATION_ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth-client";

function VerticalSignUp(props) {
  // SIGNUP LOGIC
  const [signupUserFormData, setSignupUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
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
        },
      });

      const { token, user } = response.data.addUser;
      Auth.login(token);
    } catch (err) {
      console.error(err);
    }

    setSignupUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Sign-Up Below!
        </Modal.Title>
        <Button className="btn-info" onClick={props.onHide}>
          X
        </Button>
      </Modal.Header>
      <Modal.Body>
        <form className="main-form" onSubmit={handleSignupFormSubmit}>
          <div className="form-outline mb-4">
            <input
              className="form-control form-control-lg"
              type="username"
              name="username"
              onChange={handleSignupInputChange}
              value={signupUserFormData.username}
              required
            />
            <label className="form-label" for="form2Example18">
              Username
            </label>
          </div>
          <div className="form-outline mb-4">
            <input
              type="email"
              name="email"
              className="form-control form-control-lg"
              onChange={handleSignupInputChange}
              value={signupUserFormData.email}
              required
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
              onChange={handleSignupInputChange}
              value={signupUserFormData.password}
            />
            <label className="form-label" for="form2Example28">
              Password
            </label>
          </div>
          <button
            disabled={
              !(
                signupUserFormData.username &&
                signupUserFormData.email &&
                signupUserFormData.password
              )
            }
            type="submit"
            className="btn btn-info"
          >
            Submit
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default VerticalSignUp;
