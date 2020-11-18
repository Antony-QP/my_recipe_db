import React, { useState } from 'react'

export const Login = () => {

    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const { name, email, password, password2 } = user;

    const onChange = e => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log('Login submit')
    }

    return (
        <div className="row">
            <h1>Account <span style={{ color: 'var(--orange-color)'}}>Login</span></h1>
            <form className="col s12" onSubmit={onSubmit}>
                <div className="row">
                    <div className="input-field col s12">
                        <input type="email" className="validate" placeholder="Enter email" name="email" value={email} onChange={onChange}/>
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field col s12">
                        <input type="password" className="validate" name="password" value={password} onChange={onChange} placeholder="Enter password"/>
                        <label htmlFor="password">Password</label>
                    </div>
                </div>
                <a type="submit"class="waves-effect waves-light btn black" value="login">Login</a>
            </form>
        </div>
    )
}

export default Login