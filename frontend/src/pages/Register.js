import React, { useState } from 'react'
import axios from 'axios';
import '../style/RegisterLogin.css'

function Register() {
  const [user, setUser] = useState(
    {
      name: null,
      surname: null,
      username: null,
      email: null,
      password: null,
      confirmPassword: null
    }
  )

  const handleSubmit = (e) => {
    console.log(user)
    e.preventDefault()
    axios.post(`http://localhost:5000/register`,
     { user },
     {
     headers: {
      "Content-type": "application/json; charset=UTF-8",
      }})
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className='register form-cont'>
        <form onSubmit={handleSubmit} id='register-form' className='form'>
            <label>First name</label>
            <input onChange={(e) => {user.name = e.target.value}} name='first-name' type='text' placeholder='Ex: Joe' required></input>
            <label>Second name</label>
            <input onChange={(e) => {user.surname = e.target.value}} name='first-name' type='text' placeholder='Ex: Joe' required></input>
            <label>Username</label>
            <input onChange={(e) => {user.username = e.target.value}} name='first-name' type='text' placeholder='Ex: Joe' required></input>
            <label>E-mail</label>
            <input onChange={(e) => {user.email = e.target.value}} name='first-name' type='email' placeholder='Ex: Joe' required></input>
            <label>Password</label>
            <input onChange={(e) => {user.password = e.target.value}} name='first-name' type='password' placeholder='password' required></input>
            <label>Confirm password</label>
            <input onChange={(e) => {user.confirmPassword = e.target.value}} name='first-name' type='password' placeholder='password' required></input>
            <button type='submit'>Register</button>
        </form>
    </div>
  )
}

export default Register