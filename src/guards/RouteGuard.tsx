import React from 'react';
import { Route, NavLink } from 'react-router-dom';

const RouteGuard: React.FC = ({ component: Component, ...rest }: any): JSX.Element => {

    const hasJWT =() =>
        //check user has JWT token
        !!localStorage.getItem("token");

    return (
        <Route {...rest}
               render={(props: any) => (
                   hasJWT() ?
                       <Component {...props} />
                       :
                       <NavLink to={{ pathname: '/sign-in' }} />
               )}
        />
    );
};

export default RouteGuard;
