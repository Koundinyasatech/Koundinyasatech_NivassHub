import "./Login.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../../features/auth/authAPI";
import { setCredentials } from "../../features/auth/authSlice";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginAPI({
        username,
        password,
      });

      dispatch(
        setCredentials({
          user: response.user,
          accessToken: response.accessToken,
        })
      );

      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid username or password");
    }
  };

  return (
    <div className="login-page">
      {/* Left Section */}
      <div className="login-left">
        <div className="overlay"></div>

        <div className="hero-content">
          <div className="brand">
            <h1>
              Nivass<span>Hub</span>
            </h1>
            <p>Smart Society Management Platform</p>
          </div>

          <h2>
            Simplify Living.
            <br />
            Strengthen Communities.
          </h2>

          <p className="hero-text">
            Manage your society operations, residents and finances —
            all in one smart platform.
          </p>

          <div className="stats-bar">
            <div className="stat-item">
              <h3>50+</h3>
              <p>Societies</p>
            </div>

            <div className="stat-item">
              <h3>10K+</h3>
              <p>Residents</p>
            </div>

            <div className="stat-item">
              <h3>99.9%</h3>
              <p>Uptime</p>
            </div>

            <div className="stat-item">
              <h3>24/7</h3>
              <p>Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="login-right">
        <div className="login-card">
          <div className="logo-box">
            <h2>
              Nivass<span>Hub</span>
            </h2>
            <p>Smart Society Management Platform</p>
          </div>

          <h1>Welcome Back!</h1>
          <p>Sign in to access your admin dashboard</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>User Name</label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="options">
              <label>
                <input type="checkbox" /> Remember me
              </label>

              <span>Forgot password?</span>
            </div>

            <button type="submit">Login</button>
          </form>
        </div>

        <p className="footer-text">
          Secure. Reliable. Built for Better Communities.
        </p>
      </div>
    </div>
  );
}

export default Login;