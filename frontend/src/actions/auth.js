import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  LOGOUT
} from './types'

import axios from 'axios'
import { createMessage } from './messages'

export const checkAuthenticated = () => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    const body = JSON.stringify({ token: localStorage.getItem('access') });

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config)

      if (res.data.code !== 'token_not_valid') {
        dispatch({
          type: AUTHENTICATED_SUCCESS
        });
      } else {
        dispatch({
          type: AUTHENTICATED_FAIL
        });
      }
    } catch (err) {
      dispatch({
        type: AUTHENTICATED_FAIL
      });
    }

  } else {
    dispatch({
      type: AUTHENTICATED_FAIL
    });
  }
};

export const load_user = () => async (dispatch) => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': 'application/json',
      },
    }

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/users/me/`,
        config
      )

      dispatch({
        type: USER_LOADED_SUCCESS,
        payload: res.data,
      })
    } catch (err) {
      dispatch({
        type: USER_LOADED_FAIL,
      })
    }
  } else {
    dispatch({
      type: USER_LOADED_FAIL,
    })
  }
}

export const login = (email, password) => async (dispatch) => {
  const confing = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const body = JSON.stringify({ email, password })

  try {

    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/jwt/create/`,
      body,
      confing
    )
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    })
    dispatch(createMessage({ leadAdded: 'User Login' }))
    dispatch(load_user())

  } catch (err) {

    const errors = {
      msg: err.response.data,
      status: err.response.status
    }
    dispatch({
      type: LOGIN_FAIL,
      payload: errors
    });

    console.log(err.response.data);
  }
}

export const signup = (email, name, password, re_password) => async (dispatch) => {
  const confing = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const body = JSON.stringify({ email, name, password, re_password })

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/users/`,
      body,
      confing
    )
    dispatch(createMessage({ signupSuccess: 'Signup Success, please Verify Your Email' }))
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data,
    })
  } catch (err) {
    const signupErrors = {
      msg: err.response.data,
      status: err.response.status
    }
    dispatch({
      type: SIGNUP_FAIL,
      payload: signupErrors
    })
    console.log(err.response.data);
  }
}

export const verify = (uid, token) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ uid, token });

  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config);

    dispatch({
      type: ACTIVATION_SUCCESS,
    });
    dispatch(createMessage({ activateSuccess: 'Account activated Successfully' }))
  } catch (err) {
    const activateErrors = {
      msg: err.response.data,
      status: err.response.status
    }
    dispatch({
      type: ACTIVATION_FAIL,
      payload: activateErrors
    })
    // console.log(err.response.data)
  }
};

export const reset_password = (email) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email });

  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config);
    dispatch(createMessage({ resetSuccess: 'we will send you to mail for reset your password' }))
    dispatch({
      type: PASSWORD_RESET_SUCCESS
    });
    
  } catch (err) {
    const resetPassError = {
      msg: err.response.data,
      status: err.response.status
    }
    dispatch({
      type: PASSWORD_RESET_FAIL,
      payload: resetPassError
    });
    // console.log(err.response.data);
  }
};

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ uid, token, new_password, re_new_password });

  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config);
    dispatch(createMessage({ resetPassConf: 'Password Reset SuccessFully' }))
    dispatch({
      type: PASSWORD_RESET_CONFIRM_SUCCESS
    });
  } catch (err) {
    const resetPassErr = {
      msg: err.response.data,
      status: err.response.status
    } 
    dispatch({
      type: PASSWORD_RESET_CONFIRM_FAIL,
      payload: resetPassErr
    });
    // console.log(err.response.data)
  }
};

export const logout = () => dispatch => {
  dispatch(createMessage({ logoutSucc: 'Logout Success' }))
  dispatch({
    type: LOGOUT
  });
};
