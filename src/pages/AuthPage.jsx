import { useState } from "react";
import { loginUser, registerUser } from "../api/authApi";

const initialRegisterState = {
  username: "",
  email: "",
  password: "",
  role: "STUDENT"
};

const initialLoginState = {
  email: "",
  password: ""
};

export default function AuthPage({ onAuthenticated }) {
  const [mode, setMode] = useState("login");
  const [registerForm, setRegisterForm] = useState(initialRegisterState);
  const [loginForm, setLoginForm] = useState(initialLoginState);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  async function handleRegisterSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setFeedback("");

    try {
      await registerUser(registerForm);
      setMode("login");
      setLoginForm({
        ...initialLoginState,
        email: registerForm.email
      });
      setRegisterForm(initialRegisterState);
      setFeedback("Registration created. Login with the same email and password.");
    } catch (error) {
      setFeedback(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleLoginSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setFeedback("");

    try {
      const response = await loginUser(loginForm);
      onAuthenticated({
        token: response.token,
        userId: response.userId,
        role: response.role,
        username: loginForm.email
      });
    } catch (error) {
      setFeedback(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-shell">
      <div className="hero-card">
        <span className="hero-kicker">Frontend Starter</span>
        <h1>Attendance system UI for your team contract</h1>
        <p>
          Every input and payload here follows the standardized names you shared:
          `username`, `studentId`, `subjectId`, `date`, and `status`.
        </p>

        <div className="hero-grid">
          <div className="hero-chip">JWT Login</div>
          <div className="hero-chip">Bulk Attendance</div>
          <div className="hero-chip">Reports</div>
          <div className="hero-chip">React + Vite</div>
        </div>
      </div>

      <div className="auth-card">
        <div className="mode-switch">
          <button
            type="button"
            className={mode === "login" ? "active" : ""}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            type="button"
            className={mode === "register" ? "active" : ""}
            onClick={() => setMode("register")}
          >
            Register
          </button>
        </div>

        {mode === "login" ? (
          <form className="form-grid" onSubmit={handleLoginSubmit}>
            <label>
              <span>Email</span>
              <input
                type="email"
                value={loginForm.email}
                onChange={(event) =>
                  setLoginForm((currentValue) => ({
                    ...currentValue,
                    email: event.target.value
                  }))
                }
                placeholder="user@gmail.com"
                required
              />
            </label>

            <label>
              <span>Password</span>
              <input
                type="password"
                value={loginForm.password}
                onChange={(event) =>
                  setLoginForm((currentValue) => ({
                    ...currentValue,
                    password: event.target.value
                  }))
                }
                placeholder="123456"
                required
              />
            </label>

            <button type="submit" className="primary-button" disabled={loading}>
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>
        ) : (
          <form className="form-grid" onSubmit={handleRegisterSubmit}>
            <label>
              <span>Username</span>
              <input
                type="text"
                value={registerForm.username}
                onChange={(event) =>
                  setRegisterForm((currentValue) => ({
                    ...currentValue,
                    username: event.target.value
                  }))
                }
                placeholder="username"
                required
              />
            </label>

            <label>
              <span>Email</span>
              <input
                type="email"
                value={registerForm.email}
                onChange={(event) =>
                  setRegisterForm((currentValue) => ({
                    ...currentValue,
                    email: event.target.value
                  }))
                }
                placeholder="user@gmail.com"
                required
              />
            </label>

            <label>
              <span>Password</span>
              <input
                type="password"
                value={registerForm.password}
                onChange={(event) =>
                  setRegisterForm((currentValue) => ({
                    ...currentValue,
                    password: event.target.value
                  }))
                }
                placeholder="123456"
                required
              />
            </label>

            <label>
              <span>Role</span>
              <select
                value={registerForm.role}
                onChange={(event) =>
                  setRegisterForm((currentValue) => ({
                    ...currentValue,
                    role: event.target.value
                  }))
                }
              >
                <option value="ADMIN">ADMIN</option>
                <option value="FACULTY">FACULTY</option>
                <option value="STUDENT">STUDENT</option>
              </select>
            </label>

            <button type="submit" className="primary-button" disabled={loading}>
              {loading ? "Creating..." : "Register"}
            </button>
          </form>
        )}

        {feedback ? <p className="feedback-text">{feedback}</p> : null}
      </div>
    </div>
  );
}
