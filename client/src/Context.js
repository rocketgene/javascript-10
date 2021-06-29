import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

export const Context = React.createContext(); 

export class Provider extends Component {
    
    state = {
        authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
        userCredentials: Cookies.getJSON('userCredentials') || null,
    };

    constructor() {
        super();
        this.data = new Data();
    }

    render() {
        const { authenticatedUser, userCredentials } = this.state;
        const value = {
            authenticatedUser,
            userCredentials,
            data: this.data,
            actions: {
                signIn: this.signIn,
                signOut: this.signOut
            },
        };
        return (
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>  
        );
    }
    
    signIn = async (username, password) => {
        const user = await this.data.getUser(username, password);
        if (user !== null) {
            this.setState(() => {
                return {
                    authenticatedUser: user,
                    userCredentials: Cookies.getJSON('userCredentials')
                };
            });
            Cookies.set('authenticatedUser', JSON.stringify(user), {expires: 50});
        }
        return user;
    }

    signOut = () => {
        this.setState({ authenticatedUser: null });
        Cookies.remove('authenticatedUser');
        Cookies.remove('userCredentials');
    }
}

export const Consumer = Context.Consumer;

//wrapper function that returns a component containing context
export function withContext(Component) {
    return function ContextComponent(props) {
      return (
        <Context.Consumer>
          {context => <Component {...props} context={context} />}
        </Context.Consumer>
      );
    }
}

const context = {withContext, Context}
export default context 
