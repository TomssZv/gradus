import React from 'react'
import '../style/RegisterLogin.css'

function Register() {
  return (
    <div className='register form-cont'>
        <form id='register-form' className='form'>
            <label>First name</label>
            <input name='first-name' type='text' placeholder='Ex: Joe' required></input>
            <label>Second name</label>
            <input name='first-name' type='text' placeholder='Ex: Joe' required></input>
            <label>Username</label>
            <input name='first-name' type='text' placeholder='Ex: Joe' required></input>
            <label>E-mail</label>
            <input name='first-name' type='email' placeholder='Ex: Joe' required></input>
            <label>Password</label>
            <input name='first-name' type='password' placeholder='password' required></input>
            <label>Confirm password</label>
            <input name='first-name' type='password' placeholder='password' required></input>
            <button type='submit'>Register</button>
        </form>
    </div>
  )
}

export default Register