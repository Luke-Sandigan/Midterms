import { useState } from "react";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Welcome back, ${form.email || "user"}!`);
  };

  return (
    <main className="login-page">
      <div className="ticker" aria-label="Announcements">
        <div className="ticker-track">
          <span>● SYSTEM UPDATE</span>
          <span>New features are now available</span>
          <span>● WELCOME BACK</span>
          <span>Sign in to continue to your account</span>
          <span>● SYSTEM UPDATE</span>
          <span>New features are now available</span>
          <span>● WELCOME BACK</span>
          <span>Sign in to continue to your account</span>
        </div>
      </div>

      <section className="login-shell">
        <div className="login-brand">
          <div className="brand-mark">✓</div>
          <p className="eyebrow">YOUR PORTAL</p>
          <h1>Welcome back.</h1>
          <p className="brand-copy">
            Sign in to access your account and continue where you left off.
          </p>
        </div>

        <div className="login-card">
          <div className="card-heading">
            <h2>Sign in</h2>
            <p>Enter your credentials below.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />

            <div className="password-row">
              <label htmlFor="password">Password</label>
              <button
                type="button"
                className="show-password"
                onClick={() => setShowPassword((current) => !current)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <div className="form-options">
              <label className="remember">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#forgot">Forgot password?</a>
            </div>

            <button className="login-button" type="submit">
              Sign in <span>→</span>
            </button>
          </form>

          <p className="signup">
            Don't have an account? <a href="#register">Create one</a>
          </p>
        </div>
      </section>

      <footer className="login-footer">© 2026 • Secure Portal</footer>
    </main>
  );
}

export default Login;
