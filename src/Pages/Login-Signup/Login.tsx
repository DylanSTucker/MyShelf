import { useEffect, useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const getData = async () => {
    const userEmail = "something@outlook.com";
    try {
      const response = await fetch(`http://localhost:8080/shelf/${userEmail}`);
      const json = await response.json();
      console.log(json);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getData;
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
  }
  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
              type="email"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-success w-100">
            <strong>Log In</strong>
          </button>
          <Link
            to="./signup"
            className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
          >
            Create Account
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
