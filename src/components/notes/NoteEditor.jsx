import React, {useState, useEffect} from "react";
import {useNavigate, useOutletContext, useSearchParams} from "react-router-dom";
import {getNotes, createNote, updateNote, deleteNote} from "../../API";
import NoteClass from "../../DataClasses/NoteClass";
import ErrorAlert from "../ErrorAlert";
import SaveState from "./SaveStateEnum";

const NotesPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [note, setNote] = useState(new NoteClass());
  const [noteStatus, setNoteStatus] = useState();
  const [serverError, setServerError] = useState();
  const [user] = useOutletContext();

  useEffect(() => {
    if (user === null) {
      navigate("/sign-in");
    }
  }, [user, navigate]);
  useEffect(() => {
    if (searchParams.get("id")) {
      const id = searchParams.get("id");
      getNotes(
        {id},
        (response) => {
          if (response !== "200 OK Response") setNote(JSON.parse(response)[0]);
          document.getElementById("noteContent").style.height = `${
            document.getElementById("noteContent").scrollHeight
          }px`;
        },
        (error) => {
          console.error(error);
          setServerError(error);
          setNote(null);
        }
      );
    }
  }, [searchParams]);

  const saveNote = (e, exit) => {
    setNoteStatus(SaveState.saving);
    setServerError(null);
    const update = () => {
      if (exit) {
        navigate("/notes");
        return;
      }
      setNoteStatus(SaveState.saved);
    };
    const create = (response) => {
      if (exit) {
        navigate("/notes");
        return;
      }
      setNoteStatus(SaveState.created);
      const noteData = JSON.parse(response);
      setNote({...note, id: noteData.id});
    };
    if (note.id) {
      updateNote(note, update, setServerError);
    } else {
      createNote(note, create, setServerError);
    }
  };

  const removeNote = () => {
    if (!note.id) navigate("/notes");
    deleteNote(
      note.id,
      () => {
        navigate("/notes");
      },
      setServerError
    );
  };

  return (
    <div>
      <h2 id="welcomeMessage">Narwhal Notes</h2>
      <ErrorAlert error={serverError} />
      <div className="noteEditorBox">
        <button
          id="notesNavLink"
          onClick={() => {
            saveNote(null, true);
          }}
        >
          &lt;
        </button>
        <button id="saveNoteButton" onClick={saveNote}>
          Save
        </button>
        <button id="removeNoteButton" onClick={removeNote}>
          Remove
        </button>
        <div id="noteStatus">{noteStatus}</div>
        <textarea
          className="noteContent"
          id="noteContent"
          defaultValue={note ? note.text : ""}
          onChange={(e) => {
            e.target.style.height = "";
            e.target.style.height = `${e.target.scrollHeight}px`;
            setNote({
              ...note,
              text: e.target.value,
              title: e.target.value.substring(0, 12)
            });
            setNoteStatus(SaveState.unsaved);
          }}
        />
      </div>
    </div>
  );
};

export default NotesPage;
