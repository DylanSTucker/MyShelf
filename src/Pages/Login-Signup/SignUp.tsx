import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const [, setCookie] = useCookies(undefined);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (password != confirmPassword) {
      setError("Make sure passwords match!");
      return;
    }
    const response = await fetch(
      `${process.env.SIGNUPURL}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, userName, password }),
      }
    );

    const data = await response.json();
    if (data.detail) {
      setError(data.detail);
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
          
          <div className="confirm-password-container">
            <label htmlFor="confirmPassword">
              <strong>Confirm Password</strong>
            </label>
            <input
              className="form-control rounded-0"
              type="password"
              placeholder="Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          
          {error && <p>{error}</p>}
          <button
          className="submit-button"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Sign up
          </button>
          <button
            className="login-button"
            onClick={() => navigate("/Login")}
          >
            Already Have An Account?
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
