import React, {useState, useEffect} from "react";
import {useNavigate, useOutletContext} from "react-router-dom";
import {deleteNote, getNotes} from "../../API";
import ErrorAlert from "../ErrorAlert";
import NotePreview from "./NotePreview";

const NotesPage = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState();
  const [selectedNotes, setSelectedNotes] = useState([]);
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
        setNotes(null);
      }
    );
  }, []);

  const isSelected = (id) => {
    return selectedNotes.includes(id);
  };

  const toggleNoteSelected = (id) => {
    if (isSelected(id)) {
      setSelectedNotes([...selectedNotes.filter((it) => it !== id)]);
    } else setSelectedNotes([...selectedNotes, id]);
  };

  const openNote = (id) => {
    navigate(`/note?id=${id}`);
  };

  const deleteSelectedNotes = () => {
    let newNotes = notes;
    selectedNotes.forEach((id) => {
      deleteNote(
        id,
        () => {
          newNotes = newNotes.filter((it) => it.id !== id);
          if (newNotes.length) setNotes([...newNotes]);
          else setNotes(null);
        },
        setServerError
      );
    });
    setSelectedNotes([]);
  };

  return (
    <div>
      <h2 id="welcomeMessage">Narwhal Notes</h2>
      <ErrorAlert error={serverError} />
      <div className="notesBox grid-container">
        <div className="notesOptionsMain">
          <button
            id="createNoteButton"
            onClick={() => {
              navigate("/note");
            }}
          >
            Create
          </button>
          {selectedNotes.length ? (
            <button id="removeNotesButton" onClick={deleteSelectedNotes}>
              Remove Selected
            </button>
          ) : null}
        </div>
        <div id="notesList">
          {notes ? (
            notes.map((note) => {
              return (
                <NotePreview
                  key={note.id}
                  note={note}
                  selected={isSelected(note.id)}
                  toggleNoteSelected={toggleNoteSelected}
                  openNote={openNote}
                />
              );
            })
          ) : (
            <div className="noNotes">
              You haven't created any notes. Select the '+' to begin.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotesPage;
