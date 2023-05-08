import React from "react";
import Layout from "../Components/Layout";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Register = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const submitHandler = async (e) => {
        e.preventDefault();

        dispatch({type: 'LOADING', payload: true});


        if(password !== confirmPassword) {
            toast.error('A jelszavak nem egyeznek!');
            return;
        }

        try{

            await axios.post("/api/users/register", {
                username,
                password,
            });
            toast.success('Sikeres regisztráció!');
            dispatch({type: 'LOADING', payload: false});
            navigate('/login');

        }catch(error){
            console.log(error);
            toast.error('Hibás adatok, próbáld újra!');
            dispatch({type: 'LOADING', payload: false});
        }
    }

    useEffect(() => {
        if(localStorage.getItem('user')) {
            localStorage.getItem('user');
            navigate('/');
        }
    })

    return(
        <Layout>
            <div className="form-container">
                <div className="form-groups">
                    <form className="form" onSubmit={submitHandler}>
                        <h3 className="form-title">Regisztráció</h3>
                        <div className="form-group">
                            <label htmlFor="username">Felhasználónév:</label>
                            <input type="text" onChange={(e) => setUsername(e.target.value)} className="input" id="username" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Jelszó:</label>
                            <input type="password" onChange={(e) => setPassword(e.target.value)} className="input" id="password" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="rpassword">Jelszó újra:</label>
                            <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} className="input" id="rpassword" required />
                        </div>
                        <div className="form-group">
                            <button className="login-button">Regisztráció</button>
                        </div>
                        <div className="form-group">
                            <p>Van már fiókod? <a href="/login" className="form-link">Itt tudsz bejelentkezni.</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Register;