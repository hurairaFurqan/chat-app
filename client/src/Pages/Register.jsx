import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASEURL_AUTH } from "../constants";
import { Button } from "react-bootstrap";

const Register = () => {
  let navigate = useNavigate();
  const [signUpData, setSignUpData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`${API_BASEURL_AUTH}/signUp`, signUpData)
      .then((response) => {
        console.log(response.data);
        navigate("/chat");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const handleSignIn = () => {
    navigate("/");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-outline mb-4 container">
          <input
            type={"text"}
            name={"name"}
            value={signUpData.name || ""}
            className="form-control"
            placeholder={"Enter your name"}
            required
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-outline mb-4 container">
          <input
            type={"email"}
            name={"email"}
            value={signUpData.email || ""}
            className="form-control"
            placeholder={"Enter your email"}
            required
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-outline mb-4 container">
          <input
            type={"password"}
            name={"password"}
            className="form-control"
            value={signUpData.password || ""}
            placeholder={"Enter your password"}
            required
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="mb-4 d-flex justify-content-center">
          <button type="submit" className="btn btn-primary mx-4">
            Sign UP
          </button>
          <Button onClick={handleSignIn} variant="outline-primary">
            Click here to SignIn
          </Button>
        </div>
      </form>
    </>
  );
};
export default Register;
