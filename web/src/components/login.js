import React from 'react';
import PropTypes from 'prop-types';
import APIService from '../services/API';

function setUser(user) {
  sessionStorage.setItem('user', JSON.stringify(user));
}

export default function Login({ setToken }) {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [error, setError] = React.useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await APIService.login({
        email: email,
        pwd: password
      });
      console.log(response)
      setToken(response.data.token)
      setUser(response.data.user.userId)
    }
    catch (e) {
      if(e.request.status === 400) {
        setError('Email y/o contraseña incorrecta')
      }
      else if(e.request.status === 401) {
        setError('No tienes permisos para entrar')
      }
      else {
        setError('Ha ocurrido un error')
      }
    }
  }

  return (
    <div className="login">
      <div>
        <h1>Inicio de sessión</h1>
        {error !== '' ?
          <div className='error' style={{ border: 'none' }}>{error}</div>
          :
          <></>}
        <form onSubmit={handleSubmit}>
          <label>
            <p>Email</p>
            <input type="text" onChange={e => setEmail(e.target.value)} style={{ width: '95%' }} />
          </label>
          <label>
            <p>Contraseña</p>
            <input type="password" onChange={e => setPassword(e.target.value)} style={{ width: '95%' }} />
          </label>
          <div style={{ border: 'none' }}>
            <button type="submit" className='button'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};