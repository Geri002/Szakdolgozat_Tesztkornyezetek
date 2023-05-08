import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PhoneVerify = () => {
	const [code, setCode] = useState("");
	const navigate = useNavigate();

	const postVerification = async () => {
		fetch("http://localhost:4000/api/verification", {
			method: "POST",
			body: JSON.stringify({
				code,
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
					navigate("/dashboard");
				}
			})
			.catch((err) => console.error(err));
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		postVerification();
		setCode("");
	};
	return (
		<div className='verify'>
			<h2 style={{ marginBottom: "30px" }}>Ellenőrző kód</h2>
			<form className='verify__form' onSubmit={handleSubmit}>
				<label htmlFor='code' style={{ marginBottom: "10px" }}>
					A kód el lett küldve a telefonszámodra
				</label>
				<input
					type='text'
					name='code'
					id='code'
					className='code'
					value={code}
					onChange={(e) => setCode(e.target.value)}
					required
				/>
				<button className='codeBtn'>Hitelesítés</button>
			</form>
		</div>
	);
};

export default PhoneVerify;