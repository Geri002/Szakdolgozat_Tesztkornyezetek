const express = require("express");
const cors = require("cors");
const supertokens = require("supertokens-node");
const { middleware } = require("supertokens-node/framework/express");
const Dashboard = require("supertokens-node/recipe/dashboard")

const Session = require("supertokens-node/recipe/session");
const ThirdPartyEmailPassword = require("supertokens-node/recipe/thirdpartyemailpassword")
let { Google, Github } = ThirdPartyEmailPassword;

let app = express();
const port = 3001;

let { errorHandler } = require("supertokens-node/framework/express");

supertokens.init({
    framework: "express",
    supertokens: {
        connectionURI: "https://dev-b4119461e81d11ed86b505a51b499e4e-us-east-1.aws.supertokens.io:3572",
        apiKey: "Hy-AkcXiacm4NwNEmJ0qtClB4Mh3H4",
    },
    appInfo: {
        appName: "My Demo App",
        apiDomain: "http://localhost:3001",
        websiteDomain: "http://localhost:3000",
        apiBasePath: "/auth",
        websiteBasePath: "/auth"
    },
    recipeList: [
        ThirdPartyEmailPassword.init({providers: [
            Google({
                clientId: "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
                clientSecret: "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"
            }),
            Github({
                clientId: "467101b197249757c71f",
                clientSecret: "e97051221f4b6426e8fe8d51486396703012f5bd"
            }),
        ]}),
        Session.init(),
        Dashboard.init(),
    ]
});

app.use(cors({
    origin: "http://localhost:3000",
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
}));

app.use(middleware());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use(errorHandler());

app.listen(port, () => {
    console.log(`Példa alkamzás a következőn http://localhost:${port}`);
});