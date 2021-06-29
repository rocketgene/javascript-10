import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Data from '../Data';
import ErrorsDisplay from './errors-display';

export default function Header(props) {

    //states
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [errors, setErrors] = useState([]);

    const data = new Data();
    const { context } = props;

    //set state for each input
    const change = (event) => {
        const value = event.target.value;
        switch (event.target.name) {
            case 'firstName':
                setFirstName(value);
                break;
            case 'lastName':
                setLastName(value);
                break;
            case 'emailAddress':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'confirmPassword':
                setPasswordConfirm(value);
                break;
            default:
                return;
        }
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        submit();
    }

    const submit = () => {

        //obj for req body
        const userDetails = {
            "firstName": firstName,
            "lastName": lastName,
            "emailAddress": email,
            "password": password
        }

        async function fetchData () {
            try {
                const response = await data.createUser(userDetails);
                if (response === true) {
                    context.actions.signIn(email, password);
                    props.history.push('/');
                } else {
                    setErrors(response)
                }
            } catch (error) {
                props.history.push('/error')
            }
        }
        fetchData();
    }

    return (
        <div className="form--centered">
            <h2>Sign Up</h2>
            <ErrorsDisplay errors={errors}/>
            
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input id="firstName" name="firstName" type="text" value={firstName} onChange={change} />
                <label htmlFor="lastName">Last Name</label>
                <input id="lastName" name="lastName" type="text" value={lastName} onChange={change} />
                <label htmlFor="emailAddress">Email Address</label>
                <input id="emailAddress" name="emailAddress" type="email" value={email} onChange={change} />
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" value={password} onChange={change} />
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input id="confirmPassword" name="confirmPassword" type="password" value={passwordConfirm} onChange={change} />

                <button className="button" type="submit">Sign Up</button>
                <button className="button button-secondary"><Link to="/">Cancel</Link></button>
            </form>
            <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
        </div>
    )
};

