import { useState, useEffect } from "react";
import image from "../assets/image.png";
import lock from "../assets/lock.png";

export default function Window({ noteWindow }) {

  const [showGroup, setShowGroup] = useState(false);
  const [tasks, setTasks] = useState(false);

  const handledata = () => {
    setTasks(true);
  }

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem(noteWindow?.noteData)) || [];
    setTasks(stored);
  }, [noteWindow]);

  useEffect(() => {
    if (noteWindow) {
      localStorage.setItem(selectedGroup.noteData, JSON.stringify(tasks));
    }
  }, [tasks, noteWindow]);

  const handleChange = (e) => {
    setShowGroup(e.target.value);
  };

  return (
    <div className="right-side">
      {noteWindow &&
        <div style={{ fontSize: "50px" }}>
          <span style={{
            fontSize: "20px",
            background: note.colorChoose,
            borderRadius: "50%",
            padding: "15px",
            height: "70px",
            display: "flex",
            width: "70px",
            alignItems: "center",
            justifyContent: "center"
          }}> hello</span>
          <span>hiii </span>
        </div>
      }
      {!noteWindow &&
        <div>
          <img src={image} className="img1"/>
          <h1 className="PocketNotes">Pocket Notes</h1>
          <p className="para">
            Send and receive messages without keeping your phone online.Use Pocket
            Notes on up to 4 linked devices and 1 mobile phone
          </p>
          <p className="lock">
            {" "}
            <img
              src={lock}
              style={{ height: "15px", verticalAlign: "baseline" }}
            />{" "}
            end-to-end encrypted
          </p>
        </div>
      }
    </div>
  );
}
