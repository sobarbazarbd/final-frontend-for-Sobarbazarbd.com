"use client";
import React, { useState } from "react";
import Link from "next/link";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <section className='account py-80'>
      <div className='container container-lg'>
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className='border border-gray-100 hover-border-main-600 transition-1 rounded-16 px-24 py-40'>
              <h6 className='text-xl mb-32'>Create New Account</h6>
              <form action='#'>
                <div className='mb-24'>
                  <label
                    htmlFor='username'
                    className='text-neutral-900 text-lg mb-8 fw-medium'
                  >
                    Username <span className='text-danger'>*</span>{" "}
                  </label>
                  <input
                    type='text'
                    className='common-input'
                    id='username'
                    placeholder='Choose a username'
                  />
                </div>
                <div className='mb-24'>
                  <label
                    htmlFor='email'
                    className='text-neutral-900 text-lg mb-8 fw-medium'
                  >
                    Email address <span className='text-danger'>*</span>{" "}
                  </label>
                  <input
                    type='email'
                    className='common-input'
                    id='email'
                    placeholder='Enter your email address'
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
                      placeholder='Create a password'
                    />
                    <span
                      className={`toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y cursor-pointer ${
                        showPassword ? "ph ph-eye" : "ph ph-eye-slash"
                      }`}
                      onClick={togglePasswordVisibility}
                    />
                  </div>
                </div>
                <div className='mb-24'>
                  <label
                    htmlFor='confirmPassword'
                    className='text-neutral-900 text-lg mb-8 fw-medium'
                  >
                    Confirm Password <span className='text-danger'>*</span>
                  </label>
                  <div className='position-relative'>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className='common-input'
                      id='confirmPassword'
                      placeholder='Confirm your password'
                    />
                    <span
                      className={`toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y cursor-pointer ${
                        showConfirmPassword ? "ph ph-eye" : "ph ph-eye-slash"
                      }`}
                      onClick={toggleConfirmPasswordVisibility}
                    />
                  </div>
                </div>
                <div className='my-32'>
                  <div className='form-check common-check'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      id='terms'
                    />
                    <label
                      className='form-check-label flex-grow-1'
                      htmlFor='terms'
                    >
                      I agree to the{" "}
                      <Link
                        href='/terms'
                        className='text-main-600 text-decoration-underline'
                      >
                        Terms & Conditions
                      </Link>{" "}
                      and{" "}
                      <Link
                        href='/privacy'
                        className='text-main-600 text-decoration-underline'
                      >
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                </div>
                <div className='mt-32'>
                  <button type='submit' className='btn btn-main py-18 px-40 w-100'>
                    Create Account
                  </button>
                </div>
              </form>
              
              {/* Login link */}
              <div className='mt-32 pt-32 border-top border-gray-100'>
                <p className='text-center text-gray-600'>
                  Already have an account?{" "}
                  <Link
                    href='/login'
                    className='text-main-600 fw-semibold hover-text-decoration-underline'
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