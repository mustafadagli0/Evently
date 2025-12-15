import React, { useState } from "react";
import "./loginAdminPannel.css";
import { useTranslation } from "react-i18next";
import "../i18n";
import { HiUserCircle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

function LoginAdminPannel() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const ADMIN_EMAIL = "admin@site.com";
  const ADMIN_PASSWORD = "Admin123!";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin");
      return;
    }

    setError("Admin email veya şifre hatalı!");
  };

  return (
    <div className="page">
      <div className="login">
        <form onSubmit={handleLogin}>
          <HiUserCircle style={{ width: "150px", height: "150px", position: "absolute", marginTop: "100px", marginLeft: "80px" }} />

          <input
            className="username"
            type="text"
            placeholder={t("Username or Email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="password"
            type="password"
            placeholder={t("Password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="loginButton" type="submit">
            {t("login")}
          </button>

          {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default LoginAdminPannel;