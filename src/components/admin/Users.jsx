import {useState, useEffect} from "react";
import {useNavigate, useOutletContext} from "react-router-dom";
import {getUsers, promoteDemoteAccount, enableDisableAccount} from "../../API";
import ErrorAlert from "../ErrorAlert";
import Spacer from "../Spacer";

const Users = () => {
  const navigate = useNavigate();
  const [response, setResponse] = useState();
  const [serverError, setServerError] = useState();
  const [user] = useOutletContext();
  const [selectedUser, selectUser] = useState();

  useEffect(() => {
    if (user === null) {
      navigate("/sign-in");
    } else if (user && !user.roles.includes("ROLE_ADMIN")) {
      navigate("/account");
    }
  }, [user, navigate]);
  useEffect(() => {
    getUsers(
      (response) => {
        if (response !== "200 OK Response") setResponse(JSON.parse(response));
      },
      (error) => {
        console.error(error);
        setServerError(error);
        setResponse(null);
      }
    );
  }, []);

  let usersFormatted = response
    ? response.map((registeredUser) => (
        <div className="userCard" key={registeredUser.uid}>
          <div>
            <div className="userCardAdmin">
              {registeredUser.roles.includes("ROLE_ADMIN") ? "ADMIN" : ""}
            </div>
            <div className="userCardDisabled">
              {registeredUser.enabled === false ? "Disabled" : ""}
            </div>
            <div className="userCardUsername">{registeredUser.username}</div>
            <div>{registeredUser.email}</div>
          </div>
          <div>
            Name: {registeredUser.firstName} {registeredUser.lastName}
            <br />
            Account Created: {registeredUser.createdDate.substring(0, 10)}
          </div>
          {user.uid !== registeredUser.uid ? (
            <div
              className={`userCardMenu ${
                selectedUser === registeredUser.uid ? "userSelected" : ""
              }`}
            >
              <button
                className="userCardMenuButton"
                onClick={() => {
                  if (selectedUser === registeredUser.uid) selectUser(null);
                  else selectUser(registeredUser.uid);
                }}
              >
                <div>...</div>
              </button>
              <div
                className={`userCardMenuContent${
                  selectedUser === registeredUser.uid ? "Selected" : ""
                }`}
              >
                <button
                  onClick={() => {
                    const enabledFuture = !registeredUser.enabled;
                    selectUser(null);
                    enableDisableAccount(
                      {uid: registeredUser.uid, enabled: enabledFuture},
                      () => {
                        const newUsersList = response.map((it) => {
                          if (it.uid !== registeredUser.uid) return it;
                          else {
                            return {...it, enabled: enabledFuture};
                          }
                        });
                        setResponse(newUsersList);
                      },
                      setServerError
                    );
                  }}
                >
                  {registeredUser.enabled
                    ? "Disable Account"
                    : "Enable Account"}
                </button>
                <Spacer width="22px" />
                <button
                  onClick={() => {
                    const promotedFuture =
                      !registeredUser.roles.includes("ROLE_ADMIN");
                    selectUser(null);
                    promoteDemoteAccount(
                      {uid: registeredUser.uid, promoted: promotedFuture},
                      () => {
                        const newUsersList = response.map((it) => {
                          if (it.uid !== registeredUser.uid) return it;
                          else {
                            let roles = promotedFuture ? ["ROLE_ADMIN"] : [];
                            return {...it, roles};
                          }
                        });
                        setResponse(newUsersList);
                      },
                      setServerError
                    );
                  }}
                >
                  {registeredUser.roles.includes("ROLE_ADMIN")
                    ? "Demote Account"
                    : "Promote Account"}
                </button>
              </div>
            </div>
          ) : null}
        </div>
      ))
    : null;

  return (
    <div>
      <h2>Users</h2>
      <ErrorAlert error={serverError} />
      <div className="usersBox grid-container">
        <h3 id="usersPageMessage">A Detailed List of Users</h3>
        {usersFormatted}
      </div>
    </div>
  );
};

export default Users;
