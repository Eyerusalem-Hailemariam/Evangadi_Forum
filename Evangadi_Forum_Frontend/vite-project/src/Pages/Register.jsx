import React from 'react'
import { useRef } from 'react'
import axios from '../axiosConfig'
import { Link, useNavigate } from 'react-router-dom'

function Register() {

    const Navigate = useNavigate()
    const usernameDom = useRef(null)
    const firstnameDom = useRef(null)
    const lastnameDom = useRef(null)
    const emailDom = useRef(null)
    const passwordDom = useRef(null)

    async function handleSubmit(e){
        e.preventDefault()
        const usernameValue = usernameDom.current.value
        const firstnameValue = firstnameDom.current.value
        const lastnameValue = lastnameDom.current.value
        const emailValue = emailDom.current.value
        const passwordValue = passwordDom.current.value

        if(usernameValue === "" || firstnameValue === "" || lastnameValue === "" || emailValue === "" || passwordValue === ""){
            alert("Please fill all the fields")
            return
        }

        try {
            await axios.post('/user/register', {
                "username": usernameValue,
                "firstname": firstnameValue,
                "lastname": lastnameValue,
                "email" : emailValue,
                "password" : passwordValue
            });
            alert("user created successfully")
            Navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }


  return (
    <div>
      <section>
        <form onSubmit={handleSubmit}>
        <div>
            <span>username </span>
            <input ref={usernameDom} type="text" placeholder='username'/>
        </div>
        <div>
            <span>First name</span>
            <input ref= {firstnameDom} type="text" placeholder='First name'/>
        </div>
        <div>
            <span>Last name</span>
            <input ref={lastnameDom} type="text" placeholder='Last name'/>
        </div>
        <div>
            <span>email </span>
            <input ref={emailDom} type="email" placeholder='email'/>
        </div>
        <div>
            <span>password </span>
            <input ref={passwordDom} type="password" placeholder='password'/>
        </div>

        <button type="submit">Register</button>
        </form>
        <Link to="/login">Already have an account? Login</Link>
      </section>
    </div>
  )
}

export default Register
