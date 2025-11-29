"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaGoogle, FaFacebookF, FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await login(formData.username, formData.password);
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here
    console.log("Google login clicked");
  };

  const handleFacebookLogin = () => {
    // Handle Facebook login logic here
    console.log("Facebook login clicked");
  };

  return (
    <section className="account py-80">
      <div className="container container-lg">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="border border-gray-100 hover-border-main-600 transition-1 rounded-16 px-24 py-40">
              <h6 className="text-xl mb-32">Login to Your Account</h6>

              {/* Social Login Buttons */}
              <div className="mb-32">
                <div className="row g-3">
                  <div className="col-6">
                    <button
                      type="button"
                      className="btn btn-outline-secondary w-100 py-12 d-flex align-items-center justify-content-center gap-2"
                      onClick={handleGoogleLogin}
                    >
                      <FaGoogle className="text-danger" />
                      <span className="d-none d-sm-inline">Google</span>
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      type="button"
                      className="btn btn-outline-primary w-100 py-12 d-flex align-items-center justify-content-center gap-2"
                      onClick={handleFacebookLogin}
                    >
                      <FaFacebookF className="text-primary" />
                      <span className="d-none d-sm-inline">Facebook</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="position-relative text-center mb-32">
                <hr className="border-gray-300" />
                <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-gray-500 text-sm">
                  OR
                </span>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-24">
                  <label
                    htmlFor="username"
                    className="text-neutral-900 text-lg mb-8 fw-medium"
                  >
                    Username or Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="common-input"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your username or email"
                    required
                  />
                </div>
                <div className="mb-24">
                  <label
                    htmlFor="password"
                    className="text-neutral-900 text-lg mb-8 fw-medium"
                  >
                    Password <span className="text-danger">*</span>
                  </label>
                  <div className="position-relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="common-input"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                    />
                    <span
                      className="toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y cursor-pointer text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                </div>
                <div className="mb-24 mt-48">
                  <div className="flex-align gap-48 flex-wrap">
                    <button
                      type="submit"
                      className="btn btn-main py-18 px-40"
                      disabled={loading}
                    >
                      {loading ? "Logging in..." : "Log in"}
                    </button>
                    <div className="form-check common-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="remember"
                      />
                      <label
                        className="form-check-label flex-grow-1"
                        htmlFor="remember"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mt-48">
                  <Link
                    href="/forgot-password"
                    className="text-danger-600 text-sm fw-semibold hover-text-decoration-underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </form>

              {/* Sign up link */}
              <div className="mt-32 pt-32 border-top border-gray-100">
                <p className="text-center text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    href="/signup"
                    className="text-main-600 fw-semibold hover-text-decoration-underline"
                  >
                    Sign up here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;