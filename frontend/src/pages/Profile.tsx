import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FaUser, FaKey } from 'react-icons/fa';

import PageHeader from '../components/Layout/PageHeader';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const profileFormik = useFormik({
    initialValues: {
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      email: user?.email || '',
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required('First name is required'),
      last_name: Yup.string().required('Last name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (user) {
          updateUser({
            ...user,
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
          });
        }
        
        toast.success('Profile updated successfully');
      } catch (error) {
        console.error('Update error:', error);
        toast.error('Failed to update profile');
      } finally {
        setIsLoading(false);
      }
    },
  });

  const passwordFormik = useFormik({
    initialValues: {
      current_password: '',
      new_password: '',
      confirm_password: '',
    },
    validationSchema: Yup.object({
      current_password: Yup.string().required('Current password is required'),
      new_password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('New password is required'),
      confirm_password: Yup.string()
        .oneOf([Yup.ref('new_password')], 'Passwords must match')
        .required('Confirm password is required'),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        toast.success('Password changed successfully');
        passwordFormik.resetForm();
      } catch (error) {
        console.error('Password change error:', error);
        toast.error('Failed to change password');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="container-fluid">
      <PageHeader title="My Profile" subtitle="Manage your account information" />
      
      <div className="row">
        <div className="col-md-3 mb-4">
          <Card className="text-center py-4">
            <div className="mb-3">
              {user?.profile_image ? (
                <img
                  src={user.profile_image}
                  alt={user.username}
                  className="rounded-circle"
                  width="100"
                  height="100"
                />
              ) : (
                <div 
                  className="rounded-circle bg-primary d-flex align-items-center justify-content-center mx-auto"
                  style={{ width: '100px', height: '100px' }}
                >
                  <span className="text-white fs-1">
                    {user?.first_name?.[0]}{user?.last_name?.[0]}
                  </span>
                </div>
              )}
            </div>
            <h5 className="mb-1">{user?.first_name} {user?.last_name}</h5>
            <p className="text-muted mb-3">{user?.email}</p>
            <p className="badge bg-primary text-capitalize mb-0">{user?.role}</p>
          </Card>
          
          <div className="list-group mt-4">
            <button
              className={`list-group-item list-group-item-action d-flex align-items-center ${
                activeTab === 'profile' ? 'active' : ''
              }`}
              onClick={() => setActiveTab('profile')}
            >
              <FaUser className="me-3" />
              <span>Profile Information</span>
            </button>
            <button
              className={`list-group-item list-group-item-action d-flex align-items-center ${
                activeTab === 'security' ? 'active' : ''
              }`}
              onClick={() => setActiveTab('security')}
            >
              <FaKey className="me-3" />