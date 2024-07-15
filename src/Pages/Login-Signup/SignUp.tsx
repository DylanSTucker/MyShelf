import { useState } from "react";
import { useCookies } from "react-cookie";
import "./SignUp.css";

const SignUp = () => {
  const [cookies, setCookie] = useCookies(undefined);
  const [isLogin, setIsLogin] = useState(true);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  console.log(cookies);
  const viewLogin = (e: { preventDefault: () => void }, status: boolean) => {
    e.preventDefault();
    setError("");
    setIsLogin(status);
  };
  console.log(isLogin);
  console.log(import.meta.env.VITE_REACT_APP_SERVERURL);

  const handleSubmit = async (
    e: { preventDefault: () => void },
    endpoint: string
  ) => {
    e.preventDefault();
    if (!isLogin && password != confirmPassword) {
      setError("Make sure passwords match!");
      return;
    }
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_SERVERURL}/${endpoint}`,
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

      window.location.reload();
    }
  };
  return (
    <div className="login-page">
      <div className="login-container">
        <h2>{isLogin ? "Login" : "Sign-Up"}</h2>
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
          {!isLogin && (
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
          )}
          {error && <p>{error}</p>}
          <button
          className="submit-button"
            type="submit"
            onClick={(e) => handleSubmit(e, isLogin ? "login" : "signup")}
          >
            Submit
          </button>
          <button
            className={
              isLogin
                ? "login-button"
                : "login-button-highlight login-button"
            }
            //onClick={(e) => handleSubmit(e, "signup")}
            onClick={(e) => viewLogin(e, true)}
          >
            <strong>Login</strong>
          </button>
          <button
            className={
              isLogin
                ? "signup-button-highlight signup-button"
                : "signup-button"
            }
            onClick={(e) => viewLogin(e, false)}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
