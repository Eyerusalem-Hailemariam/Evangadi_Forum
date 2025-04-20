import React, { useRef } from 'react'
import axios from '../axiosConfig'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const emailDom = useRef(null)
  const passwordDom = useRef(null)

  async function handleSubmit(e) {
    e.preventDefault()
    const emailValue = emailDom.current.value
    const passwordValue = passwordDom.current.value

    if (emailValue === '' || passwordValue === '') {
      alert('Please fill all the fields')
      return
    }

    try {
      const response = await axios.post('/user/login', {
        email: emailValue,
        password: passwordValue,
      })

      alert('Login successful!')
      localStorage.setItem('token', response.data.token)
      navigate('/')
    } catch (error) {
      alert(error?.response?.data?.message || 'Login failed')
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              ref={emailDom}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              ref={passwordDom}
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
          >
            Login
          </button>
        </form>

        <div className="text-sm text-center mt-4 text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline font-medium">
            Register
          </Link>
        </div>

        <div className="text-center mt-4">
          <Link to="/" className="text-gray-500 hover:text-blue-600 text-sm underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
