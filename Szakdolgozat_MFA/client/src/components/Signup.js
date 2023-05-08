import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [tel, setTel] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const postSignUpDetails = () => {
		fetch("http://localhost:4000/api/register", {
			method: "POST",
			body: JSON.stringify({
				email,
				password,
				tel,
				username,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.error_message) {
					alert(data.error_message);
				} else {
					alert("Account created successfully!");
					navigate("/");
				}
			})
			.catch((err) => console.error(err));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		postSignUpDetails();
		setEmail("");
		setTel("");
		setUsername("");
		setPassword("");
	};
	const gotoLoginPage = () => navigate("/");

	return (
		<div className='signup__container'>
			<h2>Regisztráció </h2>
			<form className='signup__form' onSubmit={handleSubmit}>
				<label htmlFor='email'>Email cím</label>
				<input
					type='email'
					name='email'
					id='email'
					value={email}
					required
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label htmlFor='username'>Felhasználónév</label>
				<input
					type='text'
					id='username'
					name='username'
					value={username}
					required
					onChange={(e) => setUsername(e.target.value)}
				/>
				<label htmlFor='tel'>Telefonszám(+36...)</label>
				<input
					type='tel'
					name='tel'
					id='tel'
					value={tel}
					required
					onChange={(e) => setTel(e.target.value)}
				/>
				<label htmlFor='tel'>Jelszó</label>
				<input
					type='password'
					name='password'
					id='password'
					minLength={8}
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button className='signupBtn'>Regisztráció</button>
				<p>
					Van már fiókod?{" "}
					<span className='link' onClick={gotoLoginPage}>
						Bejelentkezés
					</span>
				</p>
			</form>
		</div>
	);
};

export default Signup;