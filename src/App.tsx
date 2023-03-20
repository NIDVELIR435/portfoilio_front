import React from 'react';
import './App.css';
import SignUp from "./sign/SignUp";
import SignIn from "./sign/SignIn";

function App({isLoggedIn}: { isLoggedIn: boolean }): JSX.Element {

    return (
        <div className="App">
            {isLoggedIn ? <SignUp/> : <SignIn/>}
        </div>
    );
}

export default App;
