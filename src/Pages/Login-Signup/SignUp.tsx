import { useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import e from "express";

const SignUp = () => {
  const [cookies, setCookie, removeCookie] = useCookies(undefined);
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
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();
    if (data.detail) {
      setError(data.detail);
    } else {
      setCookie("Email", data.email);
      setCookie("AuthToken", data.token);

      window.location.reload();
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>{isLogin ? "Login" : "Sign-Up"}</h2>
        <form>
          <div className="mb-3">
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
          <div className="mb-3">
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
          <div className="mb-3">
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
            <div className="mb-3">
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
            type="submit"
            onClick={(e) => handleSubmit(e, isLogin ? "login" : "signup")}
          >
            Submit
          </button>
          <button
            className={
              isLogin
                ? "btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
                : "btn w-100 btn-success"
            }
            //onClick={(e) => handleSubmit(e, "signup")}
            onClick={(e) => viewLogin(e, false)}
          >
            <strong>Login</strong>
          </button>
          <button
            className={
              isLogin
                ? "btn w-100 btn-success"
                : "btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
            }
            onClick={(e) => viewLogin(e, true)}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
