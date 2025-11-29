"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { useParams } from "next/navigation";

const ResetPasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    new_password: '',
    confirm_password: ''
  });
  const [loading, setLoading] = useState(false);
  const { resetPasswordConfirm } = useAuth();
  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.new_password !== formData.confirm_password) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    await resetPasswordConfirm(params.uid, params.token, formData.new_password);
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className='account py-80'>
      <div className='container container-lg'>
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className='border border-gray-100 hover-border-main-600 transition-1 rounded-16 px-24 py-40'>
              <h6 className='text-xl mb-32'>Reset Password</h6>
              <p className='text-gray-600 mb-32'>
                Enter your new password below.
              </p>

              <form onSubmit={handleSubmit}>
                <div className='mb-24'>
                  <label htmlFor='new_password' className='text-neutral-900 text-lg mb-8 fw-medium'>
                    New Password <span className='text-danger'>*</span>
                  </label>
                  <div className='position-relative'>
                    <input
                      type={showPassword ? "text" : "password"}
                      className='common-input'
                      id='new_password'
                      name='new_password'
                      value={formData.new_password}
                      onChange={handleChange}
                      placeholder='Enter new password'
                      required
                    />
                    <span
                      className='toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y cursor-pointer text-gray-600'
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                </div>

                <div className='mb-24'>
                  <label htmlFor='confirm_password' className='text-neutral-900 text-lg mb-8 fw-medium'>
                    Confirm Password <span className='text-danger'>*</span>
                  </label>
                  <div className='position-relative'>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className='common-input'
                      id='confirm_password'
                      name='confirm_password'
                      value={formData.confirm_password}
                      onChange={handleChange}
                      placeholder='Confirm new password'
                      required
                    />
                    <span
                      className='toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y cursor-pointer text-gray-600'
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                </div>

                <div className='mt-32'>
                  <button 
                    type='submit' 
                    className='btn btn-main py-18 px-40 w-100'
                    disabled={loading}
                  >
                    {loading ? 'Resetting...' : 'Reset Password'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
