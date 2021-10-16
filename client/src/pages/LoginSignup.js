import { useState } from "react";
import { useMutation } from "@apollo/client";
import { MUTATION_LOGIN } from "../utils/mutations";
import Auth from "../utils/auth-client";
import SignupModal from "../components/SignupModal";

const LoginSignup = () => {
  const [modalShow, setModalShow] = useState(false);

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

      const { token } = response.data.login;
      Auth.login(token);
    } catch (err) {
      console.error(err);
    }

    setLoginUserFormData({
      email: "",
      password: "",
    });
  };

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
                alt=''
                src="./assets/images/login-bg.jpg"
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
