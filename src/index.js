import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import SignIn from "./components/auth/SignIn";
import Register from "./components/auth/Register";
import Debug from "./components/debug/Debug";
import AccountPage from "./components/auth/AccountPage";
import UpdateAccount from "./components/auth/UpdateAccount";
import SplashPage from "./components/SplashPage";
import NotesPage from "./components/notes/NotesPage";
import NoteEditor from "./components/notes/NoteEditor";
import Users from "./components/admin/Users";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<SplashPage />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="register" element={<Register />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="update-account" element={<UpdateAccount />} />
          <Route path="dev" element={<Debug />} />
          <Route path="notes" element={<NotesPage />} />
          <Route path="note" element={<NoteEditor />} />
          <Route path="users" element={<Users />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
