import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const Login = () => {
  const [, setCookie] = useCookies(undefined);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();


  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const response = await fetch(
      `${process.env.LOGINURL}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, userName, password }),
      }
    );

    const data = await response.json();
    if (data.detail) {
      setError(data.detail);
      console.log(error);
    } else {
      setCookie("Email", data.email);
      setCookie("UserName", data.user_name);
      setCookie("AuthToken", data.token);

      navigate("/");
      window.location.reload();
    }
  };
  return (
    <div className="login-page">
      
      <header>      
        <h2>My Shelf</h2>
      </header>

      <div className="login-container">
        <form>
          <div className="username-container">
            <label htmlFor="name">
              <strong>User Name</strong>
            </label>
            <input
              className="form-control rounded-0"
              type="text"
              placeholder="Name"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="email-container">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              className="form-control rounded-0"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="password-container">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              className="form-control rounded-0"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
         
          <button
          className="submit-button"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Login
          </button>
          <button
            className="login-button"
            onClick={() => navigate("/SignUp")}
          >
            Don't have an account?
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;