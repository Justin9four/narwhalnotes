import {useState, useEffect} from "react";
import {useNavigate, useOutletContext} from "react-router-dom";
import UpdateUserClass from "../../DataClasses/UpdateUserClass";
import {updateUser} from "../../API";
import ErrorAlert from "../ErrorAlert";

const Register = () => {
  const navigate = useNavigate();
  const [updateUserObject, setUpdateUserObject] = useState(
    new UpdateUserClass()
  );
  const [response, setResponse] = useState();
  const [serverError, setServerError] = useState();
  const [user] = useOutletContext();

  useEffect(() => {
    if (response) {
      navigate("/account");
    }
  }, [response, navigate]);
  useEffect(() => {
    if (user === null) {
      navigate("/sign-in");
    }
  }, [user, navigate]);

  const profilePhotos = {
    wizard: "/img/wizard.png",
    spiderMan: "/img/spiderman.jpeg",
    link: "/img/cartoonLink.png",
    toff: "/img/toffATLA.jpg",
    woman1: "/img/woman1.png",
    man1: "/img/man1.png",
    woman2: "/img/woman2.png",
    man2: "/img/man2.png"
  };

  const photoDisplayed = () => {
    if (updateUserObject.photoUrl) {
      return updateUserObject.photoUrl;
    } else if (user.photoUrl && user.photoUrl !== "null") {
      return user.photoUrl;
    } else {
      return profilePhotos.wizard;
    }
  };

  return (
    <div>
      <h2>Update your information</h2>
      <ErrorAlert error={serverError} />
      <div className="updateAccountBox grid-container">
        {user ? (
          <>
            <h2 id="welcomeMessage">{user ? user.username : "Account"}</h2>
            <label
              id="photoUrlLabel"
              htmlFor="photoUrl"
              className="updateAccountLabel"
            >
              Profile Picture URL
            </label>
            <input
              id="photoUrl"
              className="updateAccountInput"
              type="text"
              value={updateUserObject.photoUrl}
              onChange={(e) => {
                setUpdateUserObject({
                  ...updateUserObject,
                  photoUrl: e.target.value
                });
              }}
              placeholder={
                user && user.photoUrl !== "null" ? user.photoUrl : ""
              }
            />
            <div className="profilePhotoPreviewBox">
              <img
                className="profilePhotoPreview"
                src={photoDisplayed()}
                alt="Profile Preview"
              />
            </div>
            <div className="profilePhotoBoxPreview">
              <img
                className="profilePhoto"
                onClick={() => {
                  setUpdateUserObject({
                    ...updateUserObject,
                    photoUrl: profilePhotos.wizard
                  });
                }}
                src={profilePhotos.wizard}
                alt="Profile"
              />
              <img
                className="profilePhoto"
                onClick={() => {
                  setUpdateUserObject({
                    ...updateUserObject,
                    photoUrl: profilePhotos.link
                  });
                }}
                src={profilePhotos.link}
                alt="Profile"
              />
              <img
                className="profilePhoto"
                onClick={() => {
                  setUpdateUserObject({
                    ...updateUserObject,
                    photoUrl: profilePhotos.spiderMan
                  });
                }}
                src={profilePhotos.spiderMan}
                alt="Profile"
              />
              <img
                className="profilePhoto"
                onClick={() => {
                  setUpdateUserObject({
                    ...updateUserObject,
                    photoUrl: profilePhotos.toff
                  });
                }}
                src={profilePhotos.toff}
                alt="Profile"
              />
              <img
                className="profilePhoto"
                onClick={() => {
                  setUpdateUserObject({
                    ...updateUserObject,
                    photoUrl: profilePhotos.woman1
                  });
                }}
                src={profilePhotos.woman1}
                alt="Profile"
              />
              <img
                className="profilePhoto"
                onClick={() => {
                  setUpdateUserObject({
                    ...updateUserObject,
                    photoUrl: profilePhotos.man1
                  });
                }}
                src={profilePhotos.man1}
                alt="Profile"
              />
              <img
                className="profilePhoto"
                onClick={() => {
                  setUpdateUserObject({
                    ...updateUserObject,
                    photoUrl: profilePhotos.woman2
                  });
                }}
                src={profilePhotos.woman2}
                alt="Profile"
              />
              <img
                className="profilePhoto"
                onClick={() => {
                  setUpdateUserObject({
                    ...updateUserObject,
                    photoUrl: profilePhotos.man2
                  });
                }}
                src={profilePhotos.man2}
                alt="Profile"
              />
            </div>
            <label
              id="firstNameLabel"
              htmlFor="firstName"
              className="updateAccountLabel"
            >
              First Name
            </label>
            <input
              id="firstName"
              className="updateAccountInput"
              type="text"
              value={updateUserObject.firstName}
              onChange={(e) => {
                setUpdateUserObject({
                  ...updateUserObject,
                  firstName: e.target.value
                });
              }}
              placeholder={user ? user.firstName : ""}
            />
            <label
              id="lastNameLabel"
              htmlFor="lastName"
              className="updateAccountLabel"
            >
              Last Name
            </label>
            <input
              id="lastName"
              className="updateAccountInput"
              type="text"
              value={updateUserObject.lastName}
              onChange={(e) => {
                setUpdateUserObject({
                  ...updateUserObject,
                  lastName: e.target.value
                });
              }}
              placeholder={user ? user.lastName : ""}
            />
            <label
              id="passwordLabel"
              htmlFor="password"
              className="updateAccountLabel"
            >
              Password
            </label>
            <input
              id="password"
              className="updateAccountInput"
              type="password"
              value={updateUserObject.password}
              onChange={(e) => {
                setUpdateUserObject({
                  ...updateUserObject,
                  password: e.target.value
                });
              }}
            />
            <label id="dobLabel" htmlFor="dob" className="updateAccountLabel">
              Birthday
            </label>
            <input
              id="dob"
              className="updateAccountInput"
              type="text"
              value={updateUserObject.dob}
              onChange={(e) => {
                setUpdateUserObject({...updateUserObject, dob: e.target.value});
              }}
              placeholder={user ? user.dob : ""}
            />
            <br />
            <button
              id="updateAccountButton"
              onClick={() => {
                setServerError(null);
                updateUser(updateUserObject, setResponse, setServerError);
              }}
            >
              Update
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Register;
