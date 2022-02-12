import React, {useEffect, useState} from "react";
import "./App.css";
import oceanart from "./resources/oceanart.JPG";
import {Outlet} from "react-router-dom";
import {useLocation} from "react-router-dom";
import Header from "./components/Header";
import {getUser} from "./API";

function App() {
  const location = useLocation();
  const [user, setUser] = useState(false);
  useEffect(() => {
    getUser(
      (response) => {
        setUser(JSON.parse(response));
      },
      (error) => {
        console.error(error);
        setUser(null);
      }
    );
  }, [location]);
  return (
    <div
      className="App grid-container"
      style={{
        backgroundImage: `url(${oceanart})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      }}
    >
      <Header user={user} />
      <Outlet context={[user, setUser]} />
      <footer></footer>
    </div>
  );
}

export default App;
