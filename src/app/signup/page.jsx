"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaGoogle, FaFacebookF, FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    re_password: "",
    name: "",
    phone: "",
    shipping_address: "",
    gender: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.re_password) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "https://api.hetdcl.com"}/api/v1.0/customers/register/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            shipping_address: formData.shipping_address,
            gender: formData.gender,
          }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        toast.success("Registration successful! Please login.");
        window.location.href = "/login";
      } else {
        toast.error(data.error || "Registration failed");
      }
    } catch (err) {
      toast.error("Registration failed");
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGoogleSignup = () => {
    // Handle Google signup logic here
    console.log("Google signup clicked");
  };

  const handleFacebookSignup = () => {
    // Handle Facebook signup logic here
    console.log("Facebook signup clicked");
  };

  return (
    <section className="account py-80">
      <div className="container container-lg">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="border border-gray-100 hover-border-main-600 transition-1 rounded-16 px-24 py-40">
              <h6 className="text-xl mb-32">Create New Account</h6>

              {/* Social Signup Buttons */}
              <div className="mb-32">
                <div className="row g-3">
                  <div className="col-6">
                    <button
                      type="button"
                      className="btn btn-outline-secondary w-100 py-12 d-flex align-items-center justify-content-center gap-2"
                      onClick={handleGoogleSignup}
                    >
                      <FaGoogle className="text-danger" />
                      <span className="d-none d-sm-inline">Google</span>
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      type="button"
                      className="btn btn-outline-primary w-100 py-12 d-flex align-items-center justify-content-center gap-2"
                      onClick={handleFacebookSignup}
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
                    Username <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="common-input"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Choose a username"
                    required
                  />
                </div>
                <div className="mb-24">
                  <label
                    htmlFor="name"
                    className="text-neutral-900 text-lg mb-8 fw-medium"
                  >
                    Full Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="common-input"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="mb-24">
                  <label
                    htmlFor="email"
                    className="text-neutral-900 text-lg mb-8 fw-medium"
                  >
                    Email address <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className="common-input"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                <div className="mb-24">
                  <label
                    htmlFor="phone"
                    className="text-neutral-900 text-lg mb-8 fw-medium"
                  >
                    Phone <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="common-input"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                <div className="mb-24">
                  <label
                    htmlFor="shipping_address"
                    className="text-neutral-900 text-lg mb-8 fw-medium"
                  >
                    Shipping Address <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="common-input"
                    id="shipping_address"
                    name="shipping_address"
                    value={formData.shipping_address}
                    onChange={handleChange}
                    placeholder="Enter your shipping address"
                    required
                  />
                </div>
                <div className="mb-24">
                  <label
                    htmlFor="gender"
                    className="text-neutral-900 text-lg mb-8 fw-medium"
                  >
                    Gender
                  </label>
                  <select
                    className="common-input"
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
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
                      placeholder="Create a password"
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
                <div className="mb-24">
                  <label
                    htmlFor="re_password"
                    className="text-neutral-900 text-lg mb-8 fw-medium"
                  >
                    Confirm Password <span className="text-danger">*</span>
                  </label>
                  <div className="position-relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className="common-input"
                      id="re_password"
                      name="re_password"
                      value={formData.re_password}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      required
                    />
                    <span
                      className="toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y cursor-pointer text-gray-600"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                </div>
                <div className="my-32">
                  <div className="form-check common-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="terms"
                      required
                    />
                    <label
                      className="form-check-label flex-grow-1"
                      htmlFor="terms"
                    >
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="text-main-600 text-decoration-underline"
                      >
                        Terms & Conditions
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="text-main-600 text-decoration-underline"
                      >
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                </div>
                <div className="mt-32">
                  <button
                    type="submit"
                    className="btn btn-main py-18 px-40 w-100"
                    disabled={loading}
                  >
                    {loading ? "Creating Account..." : "Create Account"}
                  </button>
                </div>
              </form>

              {/* Login link */}
              <div className="mt-32 pt-32 border-top border-gray-100">
                <p className="text-center text-gray-600">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-main-600 fw-semibold hover-text-decoration-underline"
                  >
                    Login here
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

export default SignupPage;