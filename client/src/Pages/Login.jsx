import { useContext, useState } from "react";
import { API_BASEURL_AUTH } from "../constants";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [signInData, setSignInData] = useState({});
  const { login } = useContext(AuthContext);

  let navigate = useNavigate();
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSignInData((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${API_BASEURL_AUTH}/signIn`, signInData).then((response) => {
      const { token, person } = response.data;
      if (token && person) {
        login(token, person);
        navigate("/chat");
      }
    });
  };

  const handleSignUP = () => {
    navigate("/register");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-outline mb-4 container mt-2">
          <input
            type={"email"}
            name={"email"}
            value={signInData.email || ""}
            placeholder={"Enter your email"}
            required
            id="inputEmail"
            className="form-control"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="form-outline mb-4 container">
          <input
            type={"password"}
            name={"password"}
            className="form-control"
            value={signInData.password || ""}
            placeholder={"Enter your password"}
            required
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="row mb-4">
          <div className="col d-flex justify-content-center">
            <button type="submit" className="btn btn-primary mx-4">
              Log In
            </button>
            <Button onClick={handleSignUP} variant="outline-primary">
              Click here to SignUp
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};
export default Login;
