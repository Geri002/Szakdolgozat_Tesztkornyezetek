import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const checkUser = () => {
			if (!localStorage.getItem("username")) {
				navigate("/");
			}
		};
		checkUser();
	}, [navigate]);

	const handleSignOut = () => {
		localStorage.removeItem("username");
		navigate("/");
	};

	return (
		<div className='dashboard'>
			<h2 style={{ marginBottom: "30px" }}>
				Hello, {localStorage.getItem("username")}
			</h2>
			<button className='signOutBtn' onClick={handleSignOut}>
				Kijelentkezés
			</button>
		</div>
	);
};

export default Dashboard;
