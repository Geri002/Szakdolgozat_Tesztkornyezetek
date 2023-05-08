import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import Nav from './Components/Nav';

const Dashboard = () => {
    const {user} = useAuth0();
    if (!user) {
      } else {
        return (
          <div className="dashboard">
            <Nav />
            <h1>Üdvözöljük!</h1>
            <img src={user.picture} alt="profile" />
            <h3>{user.name}</h3>
            <h3>{user.email}</h3>
            <h3>{user.gender}</h3>
            <h3>{user.profile}</h3>
          </div>
        );
      }
    }
export default Dashboard;