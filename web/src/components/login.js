import React from 'react';
import PropTypes from 'prop-types';
import APIService from '../services/API';

async function loginUser(credentials) {
  return APIService.login(credentials);
}

export default function Login({ setToken }) {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await loginUser({
      email: email,
      pwd: password
    });
    console.log(response)
    setToken(response.data.token)
  }

  return (
    <div className="login">
      <div>
        <h1>Inicio de sessión</h1>
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