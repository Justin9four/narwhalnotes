import firebaseApp from "../Firebase";
import {Buffer} from "buffer";
import {getAuth, signInWithCustomToken} from "firebase/auth";
import {handleServerError} from "./errorHandler";
import NetworkError from "../DataClasses/NetworkError";

const APICallFactory = (
  uri,
  method,
  body,
  basicAuth,
  idToken,
  dataCallback,
  errorCallback
) => {
  const apiHost =
    process.env.NODE_ENV === "production"
      ? "https://api.chandlerpod.com/"
      : "http://localhost:8080/";
  const options = {method, credentials: "include"};
  const headers = {};
  if (idToken) {
    headers.idToken = idToken;
  }
  if (body !== null) {
    options.body = JSON.stringify(body);
    headers["Content-Type"] = "application/json";
  }
  if (basicAuth) {
    headers.Authorization =
      "Basic " +
      Buffer.from(
        process.env.REACT_APP_SERVICE_ACCOUNT_NAME +
          ":" +
          process.env.REACT_APP_SERVICE_ACCOUNT_PASSWORD
      ).toString("base64");
  }
  options.headers = new Headers(headers);
  fetch(apiHost + uri, options)
    .then((response) => {
      processAuthToken(response.headers.get("x-auth-token"));
      return response
        .text()
        .then((data) => ({status: response.status, body: data}));
    })
    .then((data) => {
      handleServerError(data);
      dataCallback(
        data.body && data.body !== "" ? data.body : "200 OK Response"
      );
    })
    .catch((error) => {
      // 400 and 500 response instanceOf TypeError
      if (error instanceof TypeError) {
        if (error.message === "Failed to fetch") {
          errorCallback(new NetworkError("Server Error: Connection Refused"));
        } else {
          errorCallback(new NetworkError("Network Error: " + error.message));
        }
      } else errorCallback(new NetworkError(error.message));
    });
};

const getAPIData = (dataCallback, errorCallback) => {
  APICallFactory("api", "GET", null, null, null, dataCallback, errorCallback);
};

const processAuthToken = (authToken) => {
  if (authToken !== null) {
    const dataCallback = (data) => {
      console.log(data);
    };
    const errorCallback = (error) => {
      console.error(error);
    };
    console.log("Processing Auth Token");
    const auth = getAuth(firebaseApp);
    signInWithCustomToken(auth, authToken)
      .then((userCredential) => {
        console.log("Firebase Authenticated UID: " + userCredential.user.uid);
        auth.currentUser
          .getIdToken(true)
          .then((idToken) => {
            console.log(`idToken: ${idToken}`);
            APICallFactory(
              "api/checkToken",
              "POST",
              null,
              true,
              idToken,
              dataCallback,
              errorCallback
            );
          })
          .catch((error) => {
            console.error(
              "Firebase Error " + error.code + ": " + error.message
            );
          });
      })
      .catch((error) => {
        console.error("Firebase Error " + error.code + ": " + error.message);
      });
  }
};

const getUser = (dataCallback, errorCallback) => {
  APICallFactory(
    "api/user",
    "GET",
    null,
    null,
    null,
    dataCallback,
    errorCallback
  );
};

const updateUser = (updateUserClass, dataCallback, errorCallback) => {
  APICallFactory(
    "api/user",
    "POST",
    updateUserClass,
    false,
    null,
    dataCallback,
    errorCallback
  );
};

const deleteUser = (dataCallback, errorCallback) => {
  APICallFactory(
    "api/user",
    "DELETE",
    null,
    null,
    null,
    dataCallback,
    errorCallback
  );
};

const authenticate = (authenticationClass, dataCallback, errorCallback) => {
  APICallFactory(
    "api/authenticate",
    "POST",
    authenticationClass,
    true,
    null,
    dataCallback,
    errorCallback
  );
};

const signOutUser = (dataCallback, errorCallback) => {
  APICallFactory(
    "api/signOut",
    "POST",
    null,
    true,
    null,
    dataCallback,
    errorCallback
  );
};

const register = (registrationClass, dataCallback, errorCallback) => {
  APICallFactory(
    "api/register",
    "PUT",
    registrationClass,
    true,
    null,
    dataCallback,
    errorCallback
  );
};

const getUsers = (dataCallback, errorCallback) => {
  APICallFactory(
    "api/users",
    "GET",
    null,
    null,
    null,
    dataCallback,
    errorCallback
  );
};

const promoteDemoteAccount = (
  promoteDemoteData,
  dataCallback,
  errorCallback
) => {
  APICallFactory(
    "api/users/promote-demote",
    "POST",
    promoteDemoteData,
    false,
    null,
    dataCallback,
    errorCallback
  );
};

const enableDisableAccount = (
  enableDisableData,
  dataCallback,
  errorCallback
) => {
  APICallFactory(
    "api/users/enable-disable",
    "POST",
    enableDisableData,
    false,
    null,
    dataCallback,
    errorCallback
  );
};

const getNotes = (notesData, dataCallback, errorCallback) => {
  APICallFactory(
    "api/note",
    "GET",
    notesData,
    false,
    null,
    dataCallback,
    errorCallback
  );
};

export {
  getAPIData,
  authenticate,
  signOutUser,
  register,
  getUser,
  updateUser,
  deleteUser,
  getUsers,
  promoteDemoteAccount,
  enableDisableAccount,
  processAuthToken,
  getNotes
};
