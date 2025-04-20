import React, { useRef } from 'react'
import axios from '../axiosConfig'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
  const navigate = useNavigate()
  const usernameDom = useRef(null)
  const firstnameDom = useRef(null)
  const lastnameDom = useRef(null)
  const emailDom = useRef(null)
  const passwordDom = useRef(null)

  async function handleSubmit(e) {
    e.preventDefault()
    const usernameValue = usernameDom.current.value
    const firstnameValue = firstnameDom.current.value
    const lastnameValue = lastnameDom.current.value
    const emailValue = emailDom.current.value
    const passwordValue = passwordDom.current.value

    if (
      !usernameValue ||
      !firstnameValue ||
      !lastnameValue ||
      !emailValue ||
      !passwordValue
    ) {
      alert('Please fill all the fields')
      return
    }

    try {
      await axios.post('/user/register', {
        username: usernameValue,
        firstname: firstnameValue,
        lastname: lastnameValue,
        email: emailValue,
        password: passwordValue,
      })
      alert('User created successfully!')
      navigate('/login')
    } catch (error) {
      alert(error?.response?.data?.message || 'Registration failed')
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-purple-600 mb-6">Create an Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              ref={usernameDom}
              type="text"
              placeholder="Enter username"
              className="w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none"
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                ref={firstnameDom}
                type="text"
                placeholder="First name"
                className="w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                ref={lastnameDom}
                type="text"
                placeholder="Last name"
                className="w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              ref={emailDom}
              type="email"
              placeholder="Enter email"
              className="w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              ref={passwordDom}
              type="password"
              placeholder="Create password"
              className="w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-purple-400 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-md transition"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-600 hover:underline font-medium">
            Login
          </Link>
        </p>

        <div className="text-center mt-4">
          <Link to="/" className="text-gray-500 hover:text-purple-600 text-sm underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register

