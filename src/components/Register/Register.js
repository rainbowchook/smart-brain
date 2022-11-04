// import { render } from '@testing-library/react';
import React from 'react'
import './Register.css'

class Register extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }
    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }
    onSubmitRegister = () => {
        console.log(this.state)
        fetch(`${process.env.REACT_APP_SMART_BRAIN_API}/register`, {
            method: 'POST',
            headers: {
                // 'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(res => res.json())
        .then(user => {
            if(user.id) {
                console.log('user', user)
                this.props.loadUser(user)
                this.props.onRouteChange('home')
            } else {
                return window.alert('Error in form submission: ' + user.error)
            }
        })
        .catch(error => {
            console.log(error)
            window.alert(error)
        })
    }
    render() {
        const  { onRouteChange } = this.props;
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="text" 
                                name="name"  
                                id="name"
                                onChange={this.onNameChange}/>
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" 
                            name="email-address"  
                            id="email-address"
                            onChange={this.onEmailChange}/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" 
                            name="password"  
                            id="password"
                            onChange={this.onPasswordChange}/>
                        </div>
                        </fieldset>
                        <div className="">
                        <input 
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Register" 
                            onClick={this.onSubmitRegister}
                        />
                        </div>
                        <div className="lh-copy mt3">
                        {/* Need an extra check here for user authentication => if authenticated, user signs in automatically to home page.  Introduce extra state for authentication and check against that state; otherwise, user clicks on 'Sign In' and can skip registration and sign/in processes.*/}
                        <p 
                            className="f6 link dim black db pointer"
                            onClick={() => onRouteChange('signin')} 
                        >
                            Sign In
                        </p>
                        </div>
                    </div>
                </main>
            </article>
          )
    }
  
}

export default Register