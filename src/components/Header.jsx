import {NavLink} from "react-router-dom";

const Header = ({user}) => {
  return (
    <nav className="header">
      <NavLink to="/">
        <div className="logoBox">
          <img className="logo" src="/narwhal.png" alt="Site Logo" />
          <p className="logoText">
            Chandler
            <br />
            Pod
          </p>
        </div>
      </NavLink>
      <NavLink to={user !== null ? "/account" : "/sign-in"}>
        <div className="profilePhotoBoxHeader">
          {user && user !== null ? (
            <img
              className="profilePhotoHeader"
              src={
                user.photoUrl && user.photoUrl !== "null"
                  ? user.photoUrl
                  : "/img/wizard.png"
              }
              alt="Profile"
            />
          ) : (
            <button className="signInHeader">Sign in</button>
          )}
        </div>
      </NavLink>
    </nav>
  );
};

export default Header;
