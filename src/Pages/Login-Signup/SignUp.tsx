import { useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

const SignUp = () => {
  const [cookies, setCookie, removeCookie] = useCookies(undefined);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  console.log(cookies);

  const handleSubmit = async (
    e: { preventDefault: () => void },
    endpoint: string
  ) => {
    e.preventDefault();
    if (password != confirmPassword) {
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
        <h2>Sign-Up</h2>
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
          {error && <p>{error}</p>}
          <button
            className="btn btn-success w-100"
            onClick={(e) => handleSubmit(e, "signup")}
          >
            <strong>Sign Up</strong>
          </button>
          <Link
            to="/"
            className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
          >
            Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
