import React, {useState} from "react";

const isMobile = () => {
  if (window.matchMedia("(min-width: 640px)").matches) {
    return true;
  }
  return false;
};

const NotePreview = ({note, selected, toggleNoteSelected, openNote}) => {
  const [hoverSelect, setHoverSelect] = useState(false);
  return (
    <div
      className={`noteCard noteCardBorder${selected ? "Selected" : ""}`}
      onClick={() => {
        toggleNoteSelected(note.id);
      }}
      onMouseEnter={() => {
        if (isMobile()) setHoverSelect(true);
      }}
      onMouseLeave={() => {
        if (isMobile()) setHoverSelect(false);
      }}
    >
      <div className="noteCardTitle">
        <div>{note.title}</div>
      </div>
      <div className="noteCardText">{note.text}</div>
      <div className={`${hoverSelect || selected ? "" : "hidden"}OptionsBar`}>
        <button
          className="openNoteButton"
          onClick={() => {
            openNote(note.id);
          }}
        >
          Open
        </button>
      </div>
    </div>
  );
};

export default NotePreview;
