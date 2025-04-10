import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import { toast } from 'react-toastify';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await login(values.username, values.password);
        navigate('/dashboard');
      } catch (error) {
        console.error('Login error:', error);
        toast.error('Invalid username or password.');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="auth-container bg-light">
      <div className="auth-card">
        <div className="auth-logo">
          <h2 className="text-primary">School Resource Management</h2>
        </div>
        <h4 className="text-center mb-4">Sign In</h4>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              className={`form-control ${
                formik.touched.username && formik.errors.username ? 'is-invalid' : ''
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              disabled={isLoading}
            />
            {formik.touched.username && formik.errors.username && (
              <div className="invalid-feedback">{formik.errors.username}</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className={`form-control ${
                formik.touched.password && formik.errors.password ? 'is-invalid' : ''
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              disabled={isLoading}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="invalid-feedback">{formik.errors.password}</div>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isLoading}
            className="mb-3"
          >
            Sign In
          </Button>
        </form>
        <div className="text-center mt-3">
          <p className="text-muted">
            School Resource Management System
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;