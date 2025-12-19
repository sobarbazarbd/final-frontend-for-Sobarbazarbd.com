"use client";
import React, { useState } from "react";
import Link from "next/link";

const Account = () => {
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

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://api.hetdcl.com"}/api/v1.0/stores/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
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
        }
        setApiError(data.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      setApiError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='account py-80'>
      <div className='container container-lg'>
        <div className='row justify-content-center'>
          <div className='col-lg-8'>
            <div className='card shadow-sm'>
              <div className='card-body p-4'>
                <h2 className='text-center mb-4'>Store Registration</h2>

                {success && (
                  <div className='alert alert-success alert-dismissible fade show' role='alert'>
                    <strong>Success!</strong> Your store has been registered successfully.
                    <button
                      type='button'
                      className='btn-close'
                      onClick={() => setSuccess(false)}
                    ></button>
                  </div>
                )}

                {apiError && (
                  <div className='alert alert-danger alert-dismissible fade show' role='alert'>
                    {apiError}
                    <button
                      type='button'
                      className='btn-close'
                      onClick={() => setApiError("")}
                    ></button>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Basic Information */}
                  <h5 className='mb-3'>Basic Information</h5>
                  <div className='row mb-3'>
                    <div className='col-md-6'>
                      <label className='form-label'>
                        Store Name <span className='text-danger'>*</span>
                      </label>
                      <input
                        type='text'
                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                      />
                      {errors.name && <div className='invalid-feedback'>{errors.name}</div>}
                    </div>
                    <div className='col-md-6'>
                      <label className='form-label'>Store Type</label>
                      <select
                        className='form-select'
                        name='store_type'
                        value={formData.store_type}
                        onChange={handleChange}
                      >
                        <option value='Enterprise'>Enterprise</option>
                        <option value='Company'>Company</option>
                      </select>
                    </div>
                  </div>

                  <div className='row mb-3'>
                    <div className='col-md-6'>
                      <label className='form-label'>
                        Email <span className='text-danger'>*</span>
                      </label>
                      <input
                        type='email'
                        className={`form-control ${errors.contact_email ? "is-invalid" : ""}`}
                        name='contact_email'
                        value={formData.contact_email}
                        onChange={handleChange}
                      />
                      {errors.contact_email && (
                        <div className='invalid-feedback'>{errors.contact_email}</div>
                      )}
                    </div>
                    <div className='col-md-6'>
                      <label className='form-label'>
                        Phone Number <span className='text-danger'>*</span>
                      </label>
                      <input
                        type='text'
                        className={`form-control ${errors.phone_number ? "is-invalid" : ""}`}
                        name='phone_number'
                        value={formData.phone_number}
                        onChange={handleChange}
                      />
                      {errors.phone_number && (
                        <div className='invalid-feedback'>{errors.phone_number}</div>
                      )}
                    </div>
                  </div>

                  <div className='mb-3'>
                    <label className='form-label'>Address</label>
                    <textarea
                      className='form-control'
                      name='address'
                      rows='2'
                      value={formData.address}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className='mb-3'>
                    <label className='form-label'>City</label>
                    <input
                      type='text'
                      className='form-control'
                      name='city'
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Account Credentials */}
                  <h5 className='mb-3 mt-4'>Account Credentials</h5>
                  <div className='row mb-3'>
                    <div className='col-md-12'>
                      <label className='form-label'>
                        Username <span className='text-danger'>*</span>
                      </label>
                      <input
                        type='text'
                        className={`form-control ${errors.username ? "is-invalid" : ""}`}
                        name='username'
                        value={formData.username}
                        onChange={handleChange}
                      />
                      {errors.username && (
                        <div className='invalid-feedback'>{errors.username}</div>
                      )}
                    </div>
                  </div>

                  <div className='row mb-3'>
                    <div className='col-md-6'>
                      <label className='form-label'>
                        Password <span className='text-danger'>*</span>
                      </label>
                      <input
                        type='password'
                        className={`form-control ${errors.password ? "is-invalid" : ""}`}
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                      />
                      {errors.password && (
                        <div className='invalid-feedback'>{errors.password}</div>
                      )}
                    </div>
                    <div className='col-md-6'>
                      <label className='form-label'>
                        Confirm Password <span className='text-danger'>*</span>
                      </label>
                      <input
                        type='password'
                        className={`form-control ${errors.confirm_password ? "is-invalid" : ""}`}
                        name='confirm_password'
                        value={formData.confirm_password}
                        onChange={handleChange}
                      />
                      {errors.confirm_password && (
                        <div className='invalid-feedback'>{errors.confirm_password}</div>
                      )}
                    </div>
                  </div>

                  {/* Optional Information */}
                  <h5 className='mb-3 mt-4'>Optional Information</h5>
                  <div className='mb-3'>
                    <label className='form-label'>Founder</label>
                    <input
                      type='text'
                      className='form-control'
                      name='founder'
                      value={formData.founder}
                      onChange={handleChange}
                    />
                  </div>

                  <div className='mb-3'>
                    <label className='form-label'>Description</label>
                    <textarea
                      className='form-control'
                      name='description'
                      rows='3'
                      value={formData.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className='row mb-3'>
                    <div className='col-md-6'>
                      <label className='form-label'>Website URL</label>
                      <input
                        type='url'
                        className='form-control'
                        name='website_url'
                        value={formData.website_url}
                        onChange={handleChange}
                        placeholder='https://example.com'
                      />
                    </div>
                    <div className='col-md-6'>
                      <label className='form-label'>Tax ID</label>
                      <input
                        type='text'
                        className='form-control'
                        name='tax_id'
                        value={formData.tax_id}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className='row mb-3'>
                    <div className='col-md-4'>
                      <label className='form-label'>Facebook URL</label>
                      <input
                        type='url'
                        className='form-control'
                        name='facebook_url'
                        value={formData.facebook_url}
                        onChange={handleChange}
                      />
                    </div>
                    <div className='col-md-4'>
                      <label className='form-label'>Twitter URL</label>
                      <input
                        type='url'
                        className='form-control'
                        name='twitter_url'
                        value={formData.twitter_url}
                        onChange={handleChange}
                      />
                    </div>
                    <div className='col-md-4'>
                      <label className='form-label'>LinkedIn URL</label>
                      <input
                        type='url'
                        className='form-control'
                        name='linkedin_url'
                        value={formData.linkedin_url}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className='mb-3'>
                    <label className='form-label'>Return Policy</label>
                    <textarea
                      className='form-control'
                      name='return_policy'
                      rows='3'
                      value={formData.return_policy}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className='d-grid gap-2 mt-4'>
                    <button
                      type='submit'
                      className='btn btn-primary btn-lg'
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span
                            className='spinner-border spinner-border-sm me-2'
                            role='status'
                            aria-hidden='true'
                          ></span>
                          Registering...
                        </>
                      ) : (
                        "Register Store"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Account;
