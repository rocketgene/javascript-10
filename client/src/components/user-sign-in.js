

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorsDisplay from './errors-display';

export default function UserSignIn(props) {

    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    //set state for each input
    const change = (event) => {
        const value = event.target.value;
        switch (event.target.name) {
            case 'emailAddress':
                setEmailAddress(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                return;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        submit();
    }

    const submit = async () => {
        const { context } = props;
        const { from } = props.location.state || { from: { pathname: '/' } };

        try {
            const user = await context.actions.signIn(emailAddress, password)
            if (user === null) {
                setErrors(["Credentials are incorrect. Please try again."])
            } else {
                props.history.push(from);
            }
        } catch (error) {
            props.history.push('/error')
        }
    }
    
    return (
        <div className="form--centered">            
            <h2>Sign In</h2>
            <ErrorsDisplay errors={errors}/>

            <form onSubmit={handleSubmit}>
                <label htmlFor="emailAddress">Email Address</label>
                <input id="emailAddress" name="emailAddress" type="email" value={emailAddress} onChange={change} />
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" value={password} onChange={change} />
                <button className="button" type="submit">Sign In</button>
                <Link className="button button-secondary" to="/">Cancel</Link>
            </form>
            <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>
            
        </div>
    )
};
