import React, {useContext, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import Context from '../Context'

export default function UserSignOut() {
    const that = useContext(Context.Context);
    useEffect( () => that.actions.signOut())
    return(
        <Redirect to="/" />
    )
}