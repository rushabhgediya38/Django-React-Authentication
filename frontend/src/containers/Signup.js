import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signup } from '../actions/auth'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

const Signup = ({ signup, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    re_password: '',
  })

  const { email, name, password, re_password } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault();

    if (password === re_password){
		  signup(email, name, password, re_password);
    } else {
    	toast.error('password not match.')
    }
    setFormData({
      email: '',
      name: '',
      password: '',
      re_password: '',
    })
  }

  if (isAuthenticated) {
    return <Redirect to='/' />
  }

  return (
    <div className='container mt-5'>
      <h1>Sign UP</h1>
      <p>Sign Up your account</p>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            className='form-control'
            type='email'
            placeholder='email'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            className='form-control'
            type='text'
            placeholder='name'
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
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
          />
        </div>
        <div className='form-group'>
          <input
            className='form-control'
            type='password'
            placeholder='confirm-password'
            name='re_password'
            value={re_password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Signup
        </button>
      </form>
      <p className='mt-3'>
        have account <Link to='/login'>login</Link>
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

export default connect(mapStateToProps, { signup })(Signup);

