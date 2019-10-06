import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({component: Component, render, ...rest}) => {
    return (
        <Route
            {...rest}
            render={props => {
               if(!localStorage.userToken) return <Redirect to='/login'/>;
               return Component ? <Component {...props}/> : render(props);
            }}
        />
    )
}

export default PrivateRoute;
