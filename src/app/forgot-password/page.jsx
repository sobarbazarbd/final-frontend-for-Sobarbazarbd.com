"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await resetPassword(email);
    setLoading(false);
  };

  return (
    <section className='account py-80'>
      <div className='container container-lg'>
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className='border border-gray-100 hover-border-main-600 transition-1 rounded-16 px-24 py-40'>
              <h6 className='text-xl mb-32'>Forgot Password</h6>
              <p className='text-gray-600 mb-32'>
                Enter your email address and we'll send you a link to reset your password.
              </p>

              <form onSubmit={handleSubmit}>
                <div className='mb-24'>
                  <label htmlFor='email' className='text-neutral-900 text-lg mb-8 fw-medium'>
                    Email Address <span className='text-danger'>*</span>
                  </label>
                  <input
                    type='email'
                    className='common-input'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter your email address'
                    required
                  />
                </div>

                <div className='mt-32'>
                  <button 
                    type='submit' 
                    className='btn btn-main py-18 px-40 w-100'
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </div>
              </form>
              
              <div className='mt-32 pt-32 border-top border-gray-100 text-center'>
                <Link href='/login' className='text-main-600 fw-semibold hover-text-decoration-underline'>
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
