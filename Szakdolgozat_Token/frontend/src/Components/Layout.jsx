import React from "react";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Layout = (props) => {


    const navigate = useNavigate();

    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;


    const logoutHandler = () => {
        localStorage.removeItem('user');
        toast.success('Sikeresen kijelentkeztél!');
        navigate('login');
    }

    return(
        <>
        <div className='header'>
            <div className="col">
                <a href="/" className="logo">Fejes AutóKölcsönző</a>
            </div>
            <div className="col">
                <span className="name">{user?.username}</span>
                {user ? (
                    <span onClick={logoutHandler} className="logout">Kijelentkezés</span>
                ) : (
                    <a href="/login" className="login">Bejelentkezés</a>
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