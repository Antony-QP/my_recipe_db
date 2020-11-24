import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/alert_Context";
import AuthContext from "../../context/auth/auth_Context";

export const Login = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
    if (error === "Invalid Credentials") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("Please fill in all fields", "danger");
    } else {
      console.log("logging in");
      login({
        email,
        password,
      });
    }
  };

  return (
    <div className="container">
    <div className='row'>
      <h1>
        Account <span style={{ color: "var(--orange-color)" }}>Login</span>
      </h1>
      <form className='col s12' onSubmit={onSubmit}>
        <div className='row'>
          <div className='input-field col s12'>
            <input
              type='email'
              className='validate'
              placeholder='Enter email'
              name='email'
              value={email}
              onChange={onChange}
            />
          </div>
          <div className='input-field col s12'>
            <input
              type='password'
              className='validate'
              name='password'
              value={password}
              onChange={onChange}
              placeholder='Enter password'
            />
          </div>
        </div>
        <button
          class='btn waves-effect waves-light black align-center'
          type='submit'
          name='action'>
          Login
          <i class='material-icons right'></i>
        </button>
      </form>
    </div>
    </div>
  );
};

export default Login;
