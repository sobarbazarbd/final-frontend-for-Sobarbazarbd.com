"use client";
import React, { useState } from "react";
import Link from "next/link";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login form submitted");
  };

  return (
    <section className='account py-80'>
      <div className='container container-lg'>
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className='border border-gray-100 hover-border-main-600 transition-1 rounded-16 px-24 py-40'>
              <h6 className='text-xl mb-32'>Login to Your Account</h6>
              <form onSubmit={handleSubmit}>
                <div className='mb-24'>
                  <label
                    htmlFor='username'
                    className='text-neutral-900 text-lg mb-8 fw-medium'
                  >
                    User Name or Email Address{" "}
                    <span className='text-danger'>*</span>{" "}
                  </label>
                  <input
                    type='text'
                    className='common-input'
                    id='username'
                    placeholder='Enter your username or email'
                    required
                  />
                </div>
                <div className='mb-24'>
                  <label
                    htmlFor='password'
                    className='text-neutral-900 text-lg mb-8 fw-medium'
                  >
                    Password <span className='text-danger'>*</span>
                  </label>
                  <div className='position-relative'>
                    <input
                      type={showPassword ? "text" : "password"}
                      className='common-input'
                      id='password'
                      placeholder='Enter your password'
                      required
                    />
                    <span
                      className={`toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y cursor-pointer ${
                        showPassword ? "ph ph-eye" : "ph ph-eye-slash"
                      }`}
                      onClick={togglePasswordVisibility}
                    />
                  </div>
                </div>
                <div className='mb-24 mt-48'>
                  <div className='flex-align gap-48 flex-wrap'>
                    <button type='submit' className='btn btn-main py-18 px-40'>
                      Log in
                    </button>
                    <div className='form-check common-check'>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        id='remember'
                      />
                      <label
                        className='form-check-label flex-grow-1'
                        htmlFor='remember'
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                </div>
                <div className='mt-48'>
                  <Link
                    href='/forgot-password'
                    className='text-danger-600 text-sm fw-semibold hover-text-decoration-underline'
                  >
                    Forgot your password?
                  </Link>
                </div>
              </form>
              
              {/* Sign up link */}
              <div className='mt-32 pt-32 border-top border-gray-100'>
                <p className='text-center text-gray-600'>
                  Don't have an account?{" "}
                  <Link
                    href='/signup'
                    className='text-main-600 fw-semibold hover-text-decoration-underline'
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