import React, {useState, useEffect} from "react";
import {useNavigate, useOutletContext} from "react-router-dom";
import {getNotes} from "../API";
import ErrorAlert from "./ErrorAlert";

const NotesPage = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState();
  const [serverError, setServerError] = useState();
  const [user] = useOutletContext();

  useEffect(() => {
    if (user === null) {
      navigate("/sign-in");
    }
  }, [user, navigate]);
  useEffect(() => {
    getNotes(
      null,
      (response) => {
        if (response !== "200 OK Response") setNotes(JSON.parse(response));
      },
      (error) => {
        console.error(error);
        setServerError(error);
        setNotes(null);
      }
    );
  }, []);

  return (
    <div>
      <h2 id="welcomeMessage">Narwhal Notes</h2>
      <ErrorAlert error={serverError} />
      <div className="NotesBox">
        {notes
          ? notes.map((note) => {
              return <p>{note.text}</p>;
            })
          : null}
      </div>
    </div>
  );
};

export default NotesPage;
