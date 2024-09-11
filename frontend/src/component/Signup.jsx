import React, { useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('voter');
  const [error , setError] = useState('')
  const navigate = useNavigate()

  const url = `http://localhost:5000/api/v1/`;

  const handleSignup = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(url + `register`, { username, password, email, role }, {withCredentials:true});
      console.log(response.data);
      if(response?.data?.newUser) navigate('/')
      setError(response.data.msg)

    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="hero bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="hero-content flex-col lg:flex-row-reverse gap-8">
        <div className="text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-800 mb-4">
            Sign Up Now!
          </h1>
          <h2 className="text-2xl lg:text-3xl font-semibold text-gray-700 mb-6">
            Join the community and enhance your YouTube presence
          </h2>
          <p className="text-xl lg:text-2xl text-gray-600">
            Whether you're a YouTuber or an audience member, sign up to get started on your journey to success!
          </p>
        </div>
        <div className="card bg-white w-full max-w-md shadow-xl rounded-lg p-6">
          <form className="space-y-4" onSubmit={handleSignup}>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg font-medium text-gray-700">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered text-white  w-full py-2 px-3 border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg font-medium text-gray-700">Username</span>
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                className="input input-bordered text-white w-full py-2 px-3 border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg font-medium text-gray-700">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered  text-white w-full py-2 px-3 border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg font-medium text-gray-700">Role</span>
              </label>
              <select
                className="select select-bordered text-white w-full py-2 px-3 border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="youtuber">Youtuber</option>
                <option value="voter">Voter</option>
              </select>
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary w-full py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md"
              >
                Sign Up
              </button>
            </div>
            <p className='text-xl text-red-600 font-bold'>{error}</p>
            <p className='text-gray-700'>Already have an account? </p>
            <Link to='/' className='text-gray-700'>Login here</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
