import React, { useState } from 'react'
import axios from 'axios';
import '../style/RegisterLogin.css'

function Register() {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`http://localhost:5000/register`,
     {
      "name": name,
      "surname": surname,
      "username": username,
      "email": email,
      "password": password,
      "confirmPassword": confirmPassword
     },
     {
     headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      }})
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className='register form-cont'>
        <form onSubmit={handleSubmit} id='register-form' className='form'>
            <label>First name</label>
            <input onChange={(e) => {setName(e.target.value)}} name='first-name' type='text' placeholder='Ex: Joe' required></input>
            <label>Second name</label>
            <input onChange={(e) => {setSurname(e.target.value)}} name='first-name' type='text' placeholder='Ex: Joe' required></input>
            <label>Username</label>
            <input onChange={(e) => {setUsername(e.target.value)}} name='first-name' type='text' placeholder='Ex: Joe' required></input>
            <label>E-mail</label>
            <input onChange={(e) => {setEmail(e.target.value)}} name='first-name' type='email' placeholder='Ex: Joe' required></input>
            <label>Password</label>
            <input onChange={(e) => {setPassword(e.target.value)}} name='first-name' type='password' placeholder='password' required></input>
            <label>Confirm password</label>
            <input onChange={(e) => {setConfirmPassword(e.target.value)}} name='first-name' type='password' placeholder='password' required></input>
            <button type='submit'>Register</button>
        </form>
    </div>
  )
}

export default Register