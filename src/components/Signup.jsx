import React, { useState } from 'react';
import { AiOutlineUser, AiOutlinePhone, AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState(''); // State for handling errors

  const { name, mobile, email, password, confirmPassword } = formData;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Step 1: Loading state

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Step 2: Set loading state to true during form submission

    // Validate mobile number length
    if (!/^\d{10}$/.test(mobile)) {
      setError('Mobile number must be exactly 10 digits.');
      setLoading(false); // Ensure loading state is reset if validation fails
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false); // Ensure loading state is reset if validation fails
      return;
    }

    setError(''); // Clear any existing errors

    try {
      await axios.post('/auth/register', formData);
      toast.success('Account created successfully. A verification Link is sent to Your email');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false); // Step 4: Reset loading state after signup attempt (whether success or error)
    }
  };

  return (
    <div className=" dark:bg-slate-900 flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={onSubmit} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-xl w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">Signup</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 dark:text-white" htmlFor="name">Name</label>
          <div className="flex dark:bg-slate-700 items-center border border-gray-300 rounded-md px-3 py-2">
            <AiOutlineUser className="text-gray-600 mr-2 dark:text-white" />
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              required
              className="w-full outline-none dark:text-white dark:bg-slate-700"
              placeholder="Enter your name"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 dark:text-white" htmlFor="mobile">Mobile</label>
          <div className="flex dark:bg-slate-700 items-center border border-gray-300 rounded-md px-3 py-2">
            <AiOutlinePhone className="text-gray-600 mr-2 dark:text-white" />
            <input
              type="text"
              name="mobile"
              value={mobile}
              onChange={onChange}
              required
              className="w-full outline-none dark:bg-slate-700 dark:text-white"
              placeholder="Enter your mobile number"
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 dark:text-white" htmlFor="email">Email</label>
          <div className="flex dark:bg-slate-700 items-center border border-gray-300 rounded-md px-3 py-2">
            <AiOutlineMail className="text-gray-600 mr-2 dark:text-white" />
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              required
              className="w-full outline-none dark:text-white dark:bg-slate-700"
              placeholder="Enter your email"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 dark:text-white" htmlFor="password">Password</label>
          <div className="flex dark:bg-slate-700 items-center border border-gray-300 rounded-md px-3 py-2">
            <AiOutlineLock className="text-gray-600 mr-2 dark:text-white" />
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              className="w-full outline-none dark:text-white dark:bg-slate-700"
              placeholder="Enter your password"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 dark:text-white" htmlFor="confirmPassword">Confirm Password</label>
          <div className="flex dark:bg-slate-700 items-center border border-gray-300 rounded-md px-3 py-2">
            <AiOutlineLock className="text-gray-600 mr-2 dark:text-white" />
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              required
              className="w-full outline-none dark:text-white dark:bg-slate-700"
              placeholder="Confirm your password"
            />
          </div>
        </div>
        <button type="submit" className="w-full bg-blue-300 font-bold text-blue-800 border-2 border-blue-800 py-2 rounded-md hover:bg-blue-400 transition duration-200">
          {loading ? 'Signing up...' : 'Signup'}
        </button>
        <p className="ml-7 lg:ml-9 xl:ml-9 mt-5 dark:text-white">
          Already Have An Account?{' '}
          <a onClick={() => navigate('/login')} className="text-blue-700 hover:underline hover:text-green-700 ">
            Login
          </a>{' '}
          here.
        </p>
      </form>
    </div>
  );
};

export default Signup;
