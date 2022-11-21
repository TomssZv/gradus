import React, { useState } from 'react'
import axios from 'axios';
import '../style/RegisterLogin.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')

  // axios.defaults.withCredentials = true; 

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`http://localhost:5000/login`,
     {
      "email": email,
      "password": password,
     },
     {
      withCredentials: true,
      },
     {
     headers: {
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': 'http://localhost:3000/login',
      'Content-Type': 'application/x-www-form-urlencoded',
      }})
      .then(res => {
        console.log(res)
        setToken(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  token && console.log()

  return (
    <div className='register form-cont'>
        <form onSubmit={handleSubmit} id='register-form' className='form'>
            <label>E-mail</label>
            <input onChange={(e) => {setEmail(e.target.value)}} name='first-name' type='email' placeholder='Ex: Joe' required></input>
            <label>Password</label>
            <input onChange={(e) => {setPassword(e.target.value)}} name='first-name' type='password' placeholder='password' required></input>
            <button type='submit'>Login</button>
        </form>
    </div>
  )
}

export default Login