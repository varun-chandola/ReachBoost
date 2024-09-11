import React, { useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('voter');
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    try {

      e.preventDefault()
      const response = await axios.post(`http://localhost:5000/api/v1/login`,
        { username, password, role, email }, { withCredentials: true })
      console.log(response.data)
      if (response?.data?.token) navigate('/app')

    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="hero bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="hero-content flex-col lg:flex-row-reverse gap-8">
        <div className="text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-800 mb-4">
            Login now!
          </h1>
          <h2 className="text-2xl lg:text-3xl font-semibold text-gray-700 mb-6">
            Elevate your YouTube game and boost your video popularity
          </h2>
          <p className="text-xl lg:text-2xl text-gray-600">
            From "Just Another Video" to "YouTube Sensation": Upload your thumbnails, get real reviews, and watch your views and income soar as you pick the thumbnail that'll make your audience click faster than you can say 'viral'!
          </p>
        </div>
        <div className="card bg-white w-full max-w-md shadow-xl rounded-lg p-6">
          <form className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg font-medium text-gray-700">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full py-2 px-3 text-white border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
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
                className="input input-bordered w-full py-2 px-3 text-white border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
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
                className="input input-bordered w-full py-2 px-3 text-white border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
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
                className="select select-bordered w-full py-2 px-3 text-white border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="youtuber">Youtuber</option>
                <option value="voter">Voter</option>
              </select>
            </div>
            <div className="form-control mt-6">
              <button
                className="btn btn-primary w-full py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
            <p className='text-gray-700'>New User ? </p><Link to='/signup' className='text-gray-700'>Signup NOW</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
