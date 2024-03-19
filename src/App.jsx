import React, { useState } from 'react';
import Addnotes from "./components/Addnotes";
import Window from "./components/Window";
import "./App.css";

export default function App() {

  const [selectedNote, setSelectedNote] = useState(null);

  const handleGroupSelect = (note) => {
    setSelectedNote(note);
  };
 
  return (
    <div className="fullWindow">
      <Addnotes onGroupSelect={handleGroupSelect} />
     <Window noteWindow={selectedNote}/>
    </div>
  );
}
