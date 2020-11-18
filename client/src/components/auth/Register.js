import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/alert_Context";
import AuthContext from '../../context/auth/auth_Context'


export const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if(isAuthenticated){
      props.history.push('/')
    }
      if(error === 'User already exists'){
        setAlert(error, 'danger');
        clearErrors()
      }
      // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault()
    if (name === '' || email === '' || password === '') {
      setAlert("Please fill in all fields", "danger");
    } else if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({
        name,
        email,
        password
      })
    }
  };

  return (
    <div className='row'>
      <h1>
        Account <span style={{ color: "var(--orange-color)" }}>Register</span>
      </h1>
      <form className='col s12' onSubmit={onSubmit}>
        <div className='row'>
          <div className='input-field col s12'>
            <input
              type='text'
              className='validate'
              placeholder='Enter Name'
              name='name'
              value={name}
              onChange={onChange}
            />
            <label htmlFor='name'>Name</label>
          </div>
          <div className='input-field col s12'>
            <input
              type='email'
              className='validate'
              placeholder='Enter email'
              name='email'
              value={email}
              onChange={onChange}
            />
            <label htmlFor='email'>Email</label>
          </div>
          <div className='input-field col s12'>
            <input
              type='password'
              className='validate'
              name='password'
              value={password}
              onChange={onChange}
              placeholder='Enter password'
              minLength="6"
            />
            <label htmlFor='password'>Password</label>
          </div>
          <div className='input-field col s12'>
            <input
              type='password'
              className='validate'
              name='password2'
              value={password2}
              onChange={onChange}
              placeholder='Confirm password'
              minLength="6"
            />
            <label htmlFor='password2'>Confirm Passsword</label>
          </div>
        </div>
        <button
          class='btn waves-effect waves-light'
          type='submit'
          name='action'>
          Submit
          <i class='material-icons right'></i>
        </button>
      </form>
    </div>
  );
};

export default Register;
