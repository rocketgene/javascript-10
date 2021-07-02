import React,{ useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Context from '../Context'

export default function Header() {
    const that = useContext(Context.Context)
    const location = useLocation()

    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><Link to="/">Courses</Link></h1>
                <nav>
                    <ul className="header--signedout">
                        {
                            that.authenticatedUser
                            ? <> 
                                <li>Welcome, {that.authenticatedUser.firstName}!</li> 
                                <li><Link to="/signout">Sign Out</Link></li> 
                            </>
                            : <> 
                                <li><Link to="/signup">Sign Up</Link></li> 
                                <li><Link to={{ pathname: '/signin', state: { from: location } }} >Sign In</Link></li>
                            </>
                        }
                    </ul>
                </nav>
            </div>
        </header>
    )
};
