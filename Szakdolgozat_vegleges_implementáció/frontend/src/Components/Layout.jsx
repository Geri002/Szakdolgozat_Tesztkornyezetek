import React from "react";
import { useAuth0 } from '@auth0/auth0-react';

const Layout = (props) => {

    const {
        loginWithPopup,
        logout,
        user
    } = useAuth0();


    return(
        <>
        <div className='header'>
            <div className="col">
                <a href="/" className="logo">Fejes AutóKölcsönző</a>
            </div>
            <div className="col">
                <span className="name">{user?.email}</span>
                {user ? (
                    <button onClick={logout} className="logout">Kijelentkezés</button>
                ) : (
                    <button onClick={loginWithPopup} className="login">Bejelentkezés</button>
                )}

            </div>


        </div>
        <div className="main">
            {props.children}
        </div>
        <div className="footer">
            <p>Copyright &copy; 2022 - Fejes Gergő</p>
        </div>
        </>
    )
}

export default Layout;