import { CognitoAuth } from "amazon-cognito-auth-js/dist/amazon-cognito-auth";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import { config as AWSConfig } from "aws-sdk";

AWSConfig.region = "us-east-1";

const createCognitoAuth = () => {
  const auth = new CognitoAuth({
    UserPoolId: "us-east-1_y2kiCkwQZ",
    ClientId: "3j129j5upfa7njjnhnlbg7mtjg",
    AppWebDomain: "https://cloudproject5409.auth.us-east-1.amazoncognito.com",
    TokenScopesArray: [
      "phone",
      "email",
      "profile",
      "openid",
      "aws.cognito.signin.user.admin"
    ],
    RedirectUriSignIn: "http://localhost:3000/",
    RedirectUriSignOut: "http://localhost:3000/"
  });
  return auth;
};

const createCognitoUser = () => {
  const pool = createCognitoUserPool();
  console.log("pool ", pool);
  return pool.getCurrentUser();
};

const createCognitoUserPool = () =>
  new CognitoUserPool({
    UserPoolId: "us-east-1_y2kiCkwQZ",
    ClientId: "3j129j5upfa7njjnhnlbg7mtjg"
  });

// Parse the response from a Cognito callback URI (assumed a token or code is in the supplied href). Returns a promise.
const parseCognitoWebResponse = href => {
  return new Promise((resolve, reject) => {
    const auth = createCognitoAuth();

    // userHandler will trigger the promise
    auth.userhandler = {
      onSuccess: function (result) {
        resolve(result);
      },
      onFailure: function (err) {
        reject(new Error("Failure parsing Cognito web response: " + err));
      }
    };
    auth.parseCognitoWebResponse(href);
  });
};

const getCognitoSession = () => {
  return new Promise((resolve, reject) => {
    const cognitoUser = createCognitoUser();
    console.log("user  ", cognitoUser);
    cognitoUser?.getSession((err, result) => {
      console.log("result ", result);
      if (err || !result) {
        reject(new Error("Failure getting Cognito session: " + err));
        return;
      }

      // Resolve the promise with the session credentials
      console.log("Successfully got session: " + JSON.stringify(result));
      const session = {
        credentials: {
          accessToken: result.accessToken.jwtToken,
          idToken: result.idToken.jwtToken,
          refreshToken: result.refreshToken.token
        },
        user: {
          userName: result.idToken.payload["cognito:username"],
          email: result.idToken.payload.email
        }
      };
      resolve(session);
    });
  });
};
export default {
  createCognitoAuth,
  createCognitoUser,
  parseCognitoWebResponse,
  getCognitoSession,
  createCognitoUserPool
};
