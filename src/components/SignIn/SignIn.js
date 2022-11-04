// import { render } from '@testing-library/react';
import React from 'react'
import './SignIn.css'

class SignIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }
    onEmailChange = event => {
        this.setState({signInEmail: event.target.value})
    }
    onPasswordChange = event => {
        this.setState({signInPassword: event.target.value})
    }
    onSubmitSignIn = () => {
        console.log('Email and password:', this.state.signInEmail, this.state.signInPassword)
        fetch(`${process.env.REACT_APP_SMART_BRAIN_API}/signin`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(res => res.json())
        .then(user => {
            console.log('returned user', user)
            if(user.id) {
                console.log('user id signed in', user.id)
                this.props.loadUser(user)
                this.props.onRouteChange('home')
            } else {
                return window.alert('Error signing in: ' + user)
            }

        })
        .catch(error => {
            console.log('here', error)
            return window.alert('Error: ', error)
        })
        // .then(data => {
        //     if(data === 'success') {
        //         this.props.onRouteChange('home')
        //     } else {
        //         return 
        //     }

        // })
        
    }
    render() {
        // const { onRouteChange } = this.props;
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address" 
                                // onChange={(event) => this.onEmailChange(event)}/>
                                onChange={this.onEmailChange}/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password"
                                // onChange={(event) => this.onPasswordChange(event)}/>
                                onChange={this.onPasswordChange}/>
                        </div>
                        </fieldset>
                        <div className="">
                        <input 
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Sign in" 
                            onClick={this.onSubmitSignIn}
                        />
                        </div>
                        <div className="lh-copy mt3">
                        <p 
                            className="f6 link dim black db pointer"
                            onClick={() => this.props.onRouteChange('register')} 
                        >
                            Register
                        </p>
                        </div>
                    </div>
                </main>
            </article>
          );
    }
}

export default SignIn