import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from './Component/Home';

import { SessionAuth } from "supertokens-auth-react/recipe/session";

import SuperTokens, { SuperTokensWrapper, getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import * as reactRouterDom from "react-router-dom";

import ThirdPartyEmailPassword, {Github, Google, Facebook, Apple} from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import Session from "supertokens-auth-react/recipe/session";

SuperTokens.init({
    appInfo: {
        appName: "My Demo App",
        apiDomain: "http://localhost:3001",
        websiteDomain: "http://localhost:3000",
        apiBasePath: "/auth",
        websiteBasePath: "/auth"
    },
    recipeList: [
        ThirdPartyEmailPassword.init({
            signInAndUpFeature: {
                providers: [
                    Github.init(),
                    Google.init(),
                    Facebook.init(),
                    Apple.init(),
                ]
            }
        }),
        Session.init()
    ]
});


function App () {
        return (
            <SuperTokensWrapper>
                <BrowserRouter>
                    <Routes>
                        {/*This renders the login UI on the /auth route*/}
                        {getSuperTokensRoutesForReactRouterDom(reactRouterDom)}
                        <Route
                                path="/"
                                element={
                                    <SessionAuth>
                                      <Home/>
                                    </SessionAuth>
                                }
                            />
                    </Routes>
                </BrowserRouter>
            </SuperTokensWrapper>
        );
    }

export default App;