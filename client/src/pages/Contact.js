import { useState } from "react";
import { validateEmail } from "../utils/helpers";
import "../components/Contact.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    if (inputType === "name") {
      setName(inputValue);
    } else if (inputType === "email") {
      setEmail(inputValue);
    } else {
      setMessage(inputValue);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setErrorMessage("Please enter valid email address");
      return;
    }

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="container">
      <div className="card responsive-width mx-2 p-4 my-5 border border-dark">
        <div>
          <h3>Have Questions, or Suggestions? We'd love to hear from you</h3>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              name="name"
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="mt-3">Email</label>
            <input
              name="email"
              type="text"
              className="form-control"
              id="contactEmail"
              value={email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="mt-3">Message</label>
            <textarea
              name="message"
              rows="3"
              className="form-control mb-4"
              value={message}
              onChange={handleInputChange}
              required
            />
          </div>
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleFormSubmit}
          >
            Submit
          </button>
        </form>
        {errorMessage && (
          <div>
            <p className="error-text">{errorMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Contact;
