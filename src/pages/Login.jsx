import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../api/api";
import {
  Eye,
  EyeOff,
  RefreshCw,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";

const STORAGE_KEY = "marketgrid_users";
const VENDOR_STORAGE_KEY = "marketgrid_vendors";
const DEMO_USER = {
  email: "sruthi@gmail.com",
  password: "Sruthi@123",
  name: "Demo User",
};
const DEMO_VENDOR = {
  email: "vendor@marketgrid.com",
  password: "Vendor@123",
  name: "MarketGrid Vendor",
  storeName: "Demo Store",
};

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function generateCaptcha() {
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let captcha = "";

  for (let i = 0; i < 6; i++) {
    captcha += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return captcha;
}

function getStoredUsers(storageKey = STORAGE_KEY) {
  try {
    const saved = localStorage.getItem(storageKey);
    const parsed = saved ? JSON.parse(saved) : [];

    return Array.isArray(parsed)
      ? parsed
          .filter((user) => user && typeof user.email === "string")
          .map((user) => ({
            ...user,
            email: String(user.email).trim().toLowerCase(),
            password: String(user.password || "").trim(),
            name: String(user.name || "User").trim(),
          }))
      : [];
  } catch {
    return [];
  }
}

function saveStoredUsers(users, storageKey = STORAGE_KEY) {
  localStorage.setItem(
    storageKey,
    JSON.stringify(
      users.map((user) => ({
        ...user,
        email: String(user.email || "").trim().toLowerCase(),
        password: String(user.password || "").trim(),
        name: String(user.name || "User").trim(),
      }))
    )
  );
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isStrongPassword(password) {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password)
  );
}

export default function Login({ mode = "login", role = "user" }) {
  const navigate = useNavigate();
  const isRegister = mode === "register";
  const isVendor = role === "vendor";
  const storageKey = isVendor ? VENDOR_STORAGE_KEY : STORAGE_KEY;
  const demoAccount = isVendor ? DEMO_VENDOR : DEMO_USER;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaCode, setCaptchaCode] = useState(generateCaptcha());
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const refreshCaptcha = () => {
    setCaptchaCode(generateCaptcha());
    setCaptcha("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();

    if (!normalizedEmail || !normalizedPassword) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!isValidEmail(normalizedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (isRegister && !name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (isRegister && !isStrongPassword(normalizedPassword)) {
      setError("Password must be at least 8 characters and include uppercase, lowercase, and a number.");
      return;
    }

    if (!captcha) {
      setError("Please complete the security verification.");
      return;
    }

    if (captcha.toUpperCase() !== captchaCode) {
      setError("Incorrect CAPTCHA. Please try again.");
      refreshCaptcha();
      return;
    }

    try {
      const backendRole = isVendor ? "VENDOR" : "CUSTOMER";
      const data = isRegister
        ? await registerUser({
            name: name.trim(),
            email: normalizedEmail,
            password: normalizedPassword,
            role: backendRole,
          })
        : await loginUser(normalizedEmail, normalizedPassword, backendRole);
      const account = data.user || data.account || data;
      const token = data.token || data.accessToken || data.jwt;

      if (token) sessionStorage.setItem("marketgrid_token", token);
      sessionStorage.setItem("marketgrid_session", crypto.randomUUID());
      sessionStorage.setItem("marketgrid_role", role);
      sessionStorage.setItem(
        "marketgrid_user",
        JSON.stringify({
          name: account.name || name.trim() || demoAccount.name,
          email: account.email || normalizedEmail,
          role,
          storeName: account.storeName || (isVendor ? `${account.name || name.trim()}'s Store` : undefined),
        })
      );

      navigate(isVendor ? "/vendor-dashboard" : "/dashboard");
    } catch (requestError) {
      setError(requestError.message || "Unable to connect to the backend.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-panel">
        <div className="auth-brand-wrap">
          <div className="auth-brand">
            <div className="brand-icon">M</div>
            <span>MarketGrid</span>
          </div>
        </div>

        <div className="auth-copy">
          <div className="security-icon">
            <ShieldCheck size={42} />
          </div>
          <span className="eyebrow">Secure access</span>
          <h1>{isRegister ? "Create your account" : "Welcome back"}</h1>
          <p>
            {isRegister
              ? `Register as a ${isVendor ? "vendor" : "user"} and securely access your MarketGrid module.`
              : `Sign in to continue to your protected ${isVendor ? "vendor" : "shopping"} workspace.`}
          </p>
        </div>

        <div className="auth-card">
          <div className="role-switcher" aria-label="Choose account type">
            <button type="button" className={!isVendor ? "selected" : ""} onClick={() => navigate(isRegister ? "/register/user" : "/login/user")}>User</button>
            <button type="button" className={isVendor ? "selected" : ""} onClick={() => navigate(isRegister ? "/register/vendor" : "/login/vendor")}>Vendor</button>
          </div>
          <div className="auth-header-row">
            <h2>{isRegister ? `Register as ${isVendor ? "Vendor" : "User"}` : `${isVendor ? "Vendor" : "User"} Login`}</h2>
            <button
              type="button"
              className="ghost-link"
              onClick={() => navigate(isRegister ? "/login" : "/register")}
            >
              {isRegister ? "Login" : "Register"}
            </button>
          </div>

          {error && <div className="login-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            {isRegister && (
              <>
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </>
            )}

            <label>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password</label>
            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="captcha-title">
              <label>Security check</label>
              <button type="button" onClick={refreshCaptcha}>
                <RefreshCw size={16} />
              </button>
            </div>

            <div className="captcha-code">{captchaCode}</div>
            <input
              type="text"
              placeholder="Enter CAPTCHA"
              value={captcha}
              onChange={(e) => setCaptcha(e.target.value)}
            />

            {!isRegister && (
              <div className="login-options">
                <label className="remember">
                  <input type="checkbox" />
                  Remember me
                </label>
                <button type="button" className="forgot" onClick={() => window.alert("Password recovery will be sent to your email.")}>Forgot password?</button>
              </div>
            )}

            <button type="submit" className="login-button">
              {isRegister ? "Create account" : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}