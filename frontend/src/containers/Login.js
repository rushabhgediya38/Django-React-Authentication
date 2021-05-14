import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../actions/auth'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()
const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData
  
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })
    
  const onSubmit = (e) => {
    e.preventDefault()
    login(email, password)
    toast('login sucessful')
  }
  
  if (isAuthenticated) {
    return <Redirect to='/' />
  }
  
  return (
    <div className='container mt-5'>
      <h1>Sign In</h1>
      <p>Sign into your account</p>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            className='form-control'
            type='email'
            placeholder='email'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            className='form-control'
            type='password'
            placeholder='password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Login
        </button>
      </form>
      <p className='mt-3'>
        Don't have account <Link to='/signup'>signup</Link>
      </p>
      <p className='mt-3'>
        Forgot password <Link to='/reset-password'>Reset Password</Link>
      </p>
    </div>
  )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
