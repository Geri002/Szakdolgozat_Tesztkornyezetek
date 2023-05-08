import { useEffect } from 'react';
import { useAuth, useLoginWithRedirect, ContextHolder } from "@frontegg/react";

function App() {
  const { user, isAuthenticated } = useAuth();
  const loginWithRedirect = useLoginWithRedirect();


   useEffect(() => {
     if (!isAuthenticated) {
       loginWithRedirect();
     }
   }, [isAuthenticated, loginWithRedirect]);
  
  const logout = () => {
   const baseUrl = ContextHolder.getContext().baseUrl;
   window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`;
  };
  
  return (
    <div className="App">
      { isAuthenticated ? (
        <div>
          <div>
            <img src={user?.profilePictureUrl} alt={user?.name}/>
          </div>
          <div>
            <span>Bejelentkezve, mint: {user?.name}</span>
          </div>
          <div>
            <button onClick={() => alert(user.accessToken)}>Mi a hozzáférési tokenem?</button>
          </div>
                    <div>
            <button onClick={() => logout()}>Kattints a kijelentkezéshez</button>
          </div>
        </div>
      ) : (
        <div>
          <button onClick={() => loginWithRedirect()}>Kattints a bejelentkezéshez</button>
        </div>
      )}
    </div>
  );
}

export default App;