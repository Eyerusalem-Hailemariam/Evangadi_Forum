import React from 'react'
import { useRef } from 'react'
import axios from '../axiosConfig'
import { Link, useNavigate } from 'react-router-dom'

function Login() {

  const Navigate = useNavigate()
  const emailDom = useRef(null)
  const passwordDom = useRef(null)

  async function handleSubmit(e){
    e.preventDefault()
    const emailValue = emailDom.current.value
    const passwordValue = passwordDom.current.value

    if(emailValue === "" || passwordValue === ""){
        alert("Please fill all the fields")
        return
    }

    try {
        const response = await axios.post('/user/login', {
            "email" : emailValue,
            "password" : passwordValue
        });
        alert("login successfully")

        localStorage.setItem('token', response.data.token)
        Navigate('/')
        console.log(response.data)
    } catch (error) {
        alert(error?.response?.data?.message)
        console.log(error)
    }
}


  return (
    <section>
     <form onSubmit={handleSubmit}>
        <div>
            <span>email </span>
            <input ref={emailDom} type="email" placeholder='email'/>
        </div>
        <div>
            <span>password </span>
            <input ref={passwordDom} type="password" placeholder='password'/>
        </div>

        <button type="submit">Login</button>
        </form>
        <Link to="/register">Don't have an account? Register</Link>
    </section>
  )
}

export default Login
