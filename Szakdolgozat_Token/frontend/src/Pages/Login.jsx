import React from "react";
import { useDispatch } from "react-redux";
import Layout from "../Components/Layout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";



const Login = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();

        dispatch({type: 'LOADING', payload: true});

        try{

            const {data} = await axios.post("/api/users/login", {
                username,
                password
            });
            localStorage.setItem('user', JSON.stringify(data));
            toast.success('Sikeres bejelentkezés');
            dispatch({type: 'LOADING', payload: false});
            navigate('/');

        }catch(error){
            console.log(error);
            toast.error('Hibás adatok, próbáld újra!');
            dispatch({type: 'LOADING', payload: false});
        }
    }

    useEffect(() => {
        if(localStorage.getItem('user')){
            localStorage.getItem('user');
            navigate('/');
        }
    })


    return(
        <Layout>
            <div className="form-container">
                <div className="form-groups">
                    <form className="form" onSubmit={submitHandler}>
                        <h3 className="form-title">Bejelentkezés</h3>
                        <div className="form-group">
                            <label htmlFor="username">Felhasználónév:</label>
                            <input type="text" onChange={(e) => setUsername(e.target.value)} className="input" id="username" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Jelszó:</label>
                            <input type="password" onChange={(e) => setPassword(e.target.value)} className="input" id="password" required />
                        </div>
                        <div className="form-group">
                            <button className="login-button">Bejelentkezés</button>
                        </div>
                        <div className="form-group">
                            <p>Még nincs fiókod? <a href="/register" className="form-link">Itt tudsz regisztrálni.</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Login;