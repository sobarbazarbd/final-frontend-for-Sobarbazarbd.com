"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaGoogle, FaFacebookF, FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

const Account = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact_email: "",
    phone_number: "",
    address: "",
    city: "",
    username: "",
    password: "",
    confirm_password: "",
    store_type: "Enterprise",
    founder: "",
    description: "",
    website_url: "",
    facebook_url: "",
    twitter_url: "",
    linkedin_url: "",
    latitude: "",
    longitude: "",
    tax_id: "",
    return_policy: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Store name is required";
    if (!formData.contact_email.trim()) {
      newErrors.contact_email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.contact_email)) {
      newErrors.contact_email = "Email is invalid";
    }
    if (!formData.phone_number.trim()) {
      newErrors.phone_number = "Phone number is required";
    }
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const payload = { ...formData };
      delete payload.confirm_password;

      // Remove empty optional fields
      Object.keys(payload).forEach((key) => {
        if (payload[key] === "") delete payload[key];
      });

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1.0/stores/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        toast.success("Store registered successfully!");
        // Reset form
        setFormData({
          name: "",
          contact_email: "",
          phone_number: "",
          address: "",
          city: "",
          username: "",
          password: "",
          confirm_password: "",
          store_type: "Enterprise",
          founder: "",
          description: "",
          website_url: "",
          facebook_url: "",
          twitter_url: "",
          linkedin_url: "",
          latitude: "",
          longitude: "",
          tax_id: "",
          return_policy: "",
        });
      } else {
        // Handle validation errors from API
        if (data.username) {
          setErrors((prev) => ({ ...prev, username: data.username[0] }));
          toast.error(data.username[0]);
        }
        setApiError(data.error || "Registration failed. Please try again.");
        toast.error(data.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      setApiError("Network error. Please check your connection and try again.");
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    toast.success("Google signup feature coming soon!");
  };

  const handleFacebookSignup = () => {
    toast.success("Facebook signup feature coming soon!");
  };

  return (
    <section className="account py-80">
      <div className="container container-lg">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="border border-gray-100 hover-border-main-600 transition-1 rounded-16 px-24 py-40">
              <h6 className="text-xl mb-32">Store Registration</h6>

              {/* Success Alert */}
              {success && (
                <div className="alert alert-success alert-dismissible fade show mb-32" role="alert">
                  <strong>Success!</strong> Your store has been registered successfully.
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setSuccess(false)}
                  ></button>
                </div>
              )}

              {/* API Error Alert */}
              {apiError && (
                <div className="alert alert-danger alert-dismissible fade show mb-32" role="alert">
                  {apiError}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setApiError("")}
                  ></button>
                </div>
              )}

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
                {/* Basic Information */}
                <h6 className="text-lg mb-24 text-neutral-900">Basic Information</h6>
                
                <div className="row mb-24">
                  <div className="col-md-6">
                    <label className="text-neutral-900 text-lg mb-8 fw-medium">
                      Store Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`common-input ${errors.name ? "is-invalid" : ""}`}
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter store name"
                    />
                    {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
                  </div>
                  <div className="col-md-6">
                    <label className="text-neutral-900 text-lg mb-8 fw-medium">
                      Store Type
                    </label>
                    <select
                      className="common-input"
                      name="store_type"
                      value={formData.store_type}
                      onChange={handleChange}
                    >
                      <option value="Enterprise">Enterprise</option>
                      <option value="Company">Company</option>
                    </select>
                  </div>
                </div>

                <div className="row mb-24">
                  <div className="col-md-6">
                    <label className="text-neutral-900 text-lg mb-8 fw-medium">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className={`common-input ${errors.contact_email ? "is-invalid" : ""}`}
                      name="contact_email"
                      value={formData.contact_email}
                      onChange={handleChange}
                      placeholder="Enter email address"
                    />
                    {errors.contact_email && (
                      <div className="invalid-feedback d-block">{errors.contact_email}</div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label className="text-neutral-900 text-lg mb-8 fw-medium">
                      Phone Number <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`common-input ${errors.phone_number ? "is-invalid" : ""}`}
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                    />
                    {errors.phone_number && (
                      <div className="invalid-feedback d-block">{errors.phone_number}</div>
                    )}
                  </div>
                </div>

                <div className="mb-24">
                  <label className="text-neutral-900 text-lg mb-8 fw-medium">
                    Address
                  </label>
                  <textarea
                    className="common-input"
                    name="address"
                    rows="2"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter store address"
                  ></textarea>
                </div>

                <div className="mb-24">
                  <label className="text-neutral-900 text-lg mb-8 fw-medium">
                    City
                  </label>
                  <input
                    type="text"
                    className="common-input"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                  />
                </div>

                {/* Account Credentials */}
                <h6 className="text-lg mb-24 text-neutral-900 mt-40">Account Credentials</h6>
                
                <div className="mb-24">
                  <label className="text-neutral-900 text-lg mb-8 fw-medium">
                    Username <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`common-input ${errors.username ? "is-invalid" : ""}`}
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Choose a username"
                  />
                  {errors.username && (
                    <div className="invalid-feedback d-block">{errors.username}</div>
                  )}
                </div>

                <div className="row mb-24">
                  <div className="col-md-6">
                    <label className="text-neutral-900 text-lg mb-8 fw-medium">
                      Password <span className="text-danger">*</span>
                    </label>
                    <div className="position-relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        className={`common-input ${errors.password ? "is-invalid" : ""}`}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create a password"
                      />
                      <span
                        className="toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y cursor-pointer text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                      </span>
                    </div>
                    {errors.password && (
                      <div className="invalid-feedback d-block">{errors.password}</div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label className="text-neutral-900 text-lg mb-8 fw-medium">
                      Confirm Password <span className="text-danger">*</span>
                    </label>
                    <div className="position-relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        className={`common-input ${errors.confirm_password ? "is-invalid" : ""}`}
                        name="confirm_password"
                        value={formData.confirm_password}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                      />
                      <span
                        className="toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y cursor-pointer text-gray-600"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                      </span>
                    </div>
                    {errors.confirm_password && (
                      <div className="invalid-feedback d-block">{errors.confirm_password}</div>
                    )}
                  </div>
                </div>

                {/* Optional Information */}
                <h6 className="text-lg mb-24 text-neutral-900 mt-40">Optional Information</h6>
                
                <div className="mb-24">
                  <label className="text-neutral-900 text-lg mb-8 fw-medium">
                    Founder
                  </label>
                  <input
                    type="text"
                    className="common-input"
                    name="founder"
                    value={formData.founder}
                    onChange={handleChange}
                    placeholder="Enter founder name"
                  />
                </div>

                <div className="mb-24">
                  <label className="text-neutral-900 text-lg mb-8 fw-medium">
                    Description
                  </label>
                  <textarea
                    className="common-input"
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter store description"
                  ></textarea>
                </div>

                <div className="row mb-24">
                  <div className="col-md-6">
                    <label className="text-neutral-900 text-lg mb-8 fw-medium">
                      Website URL
                    </label>
                    <input
                      type="url"
                      className="common-input"
                      name="website_url"
                      value={formData.website_url}
                      onChange={handleChange}
                      placeholder="https://example.com"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="text-neutral-900 text-lg mb-8 fw-medium">
                      Tax ID
                    </label>
                    <input
                      type="text"
                      className="common-input"
                      name="tax_id"
                      value={formData.tax_id}
                      onChange={handleChange}
                      placeholder="Enter tax ID"
                    />
                  </div>
                </div>

                <div className="row mb-24">
                  <div className="col-md-4">
                    <label className="text-neutral-900 text-lg mb-8 fw-medium">
                      Facebook URL
                    </label>
                    <input
                      type="url"
                      className="common-input"
                      name="facebook_url"
                      value={formData.facebook_url}
                      onChange={handleChange}
                      placeholder="Facebook profile URL"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="text-neutral-900 text-lg mb-8 fw-medium">
                      Twitter URL
                    </label>
                    <input
                      type="url"
                      className="common-input"
                      name="twitter_url"
                      value={formData.twitter_url}
                      onChange={handleChange}
                      placeholder="Twitter profile URL"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="text-neutral-900 text-lg mb-8 fw-medium">
                      LinkedIn URL
                    </label>
                    <input
                      type="url"
                      className="common-input"
                      name="linkedin_url"
                      value={formData.linkedin_url}
                      onChange={handleChange}
                      placeholder="LinkedIn profile URL"
                    />
                  </div>
                </div>

                <div className="mb-24">
                  <label className="text-neutral-900 text-lg mb-8 fw-medium">
                    Return Policy
                  </label>
                  <textarea
                    className="common-input"
                    name="return_policy"
                    rows="3"
                    value={formData.return_policy}
                    onChange={handleChange}
                    placeholder="Enter return policy"
                  ></textarea>
                </div>

                {/* Terms & Conditions */}
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

                {/* Submit Button */}
                <div className="mt-32">
                  <button
                    type="submit"
                    className="btn btn-main py-18 px-40 w-100"
                    disabled={loading}
                  >
                    {loading ? "Registering..." : "Register Store"}
                  </button>
                </div>
              </form>

              {/* Login link */}
              <div className="mt-32 pt-32 border-top border-gray-100">
                <p className="text-center text-gray-600">
                  Already have a store account?{" "}
                  <Link
                    href="https://vendor.sobarbazarbd.com/"
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

export default Account;