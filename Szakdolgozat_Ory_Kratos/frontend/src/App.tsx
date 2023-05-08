import React, { useEffect, useState } from "react"
import logo from './logo.svg';
import './App.css';
import { FrontendApi, Configuration, Session, Identity } from "@ory/client"

// localhost
const ory = new FrontendApi(
  new Configuration({
    basePath: 'http://localhost:4000',
    baseOptions: {
      withCredentials: true,
    },
  }),
)

function App() {
  const [session, setSession] = useState<Session | undefined>()
  const [logoutUrl, setLogoutUrl] = useState<string | undefined>()

  const getUserName = (identity: Identity) =>
    identity.traits.email || identity.traits.username

  // session adatok összegyűjtése, ha nincs belogolva akkor átírányítja oda
  useEffect(() => {
    ory
      .toSession()
      .then(({ data }) => {
        setSession(data)
        ory.createBrowserLogoutFlow().then(({ data }) => {
          setLogoutUrl(data.logout_url)
        })
      })
      .catch((err) => {
        console.error(err)
        window.location.replace('http://localhost:4000/ui/login')
      })
  }, [])

  if (!session) {
    return <h1>Betöltés...</h1>
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Üdvözlünk az Oryban,{" "}
          {
            getUserName(session?.identity)
          }
          .
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tanulj Reactet
        </a>
        {
          <a href={logoutUrl}>Kijelentkezés</a>
        }
      </header>
    </div>
  )
}

export default App
