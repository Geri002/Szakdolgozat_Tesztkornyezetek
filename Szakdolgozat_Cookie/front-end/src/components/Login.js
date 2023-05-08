import React, { useRef } from 'react';

async function loginUser(credentials) {
    return fetch('http://localhost:8080/login', {
      method: 'POST',
      //credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }).then(data => data.json())
  }


//{setToken}paraméter
export default ({setToken}) => {

    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await loginUser({
            username: emailRef.current.value,
            password: passwordRef.current.value
        })
        //window.location.reload(false);//-
        setToken(token);
      }


  return(
    <div className='login-wrapper'>
      <h1>Bejelentkezés</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Felhasználónév</p>
          <input type="text" ref={emailRef} />
        </label>
        <label>
          <p>Jelszó</p>
          <input type="password" ref={passwordRef} />
        </label>
        <div>
          <button type="submit">Beküldés</button>
        </div>
      </form>
    </div>
  );
}