import { useState, useEffect } from "react";
import image from "../assets/image.png";
import lock from "../assets/lock.png";
import { getInitials } from './utils';
import vector from '../assets/vector.png'
export default function Window({ noteWindow }) {

    const [textValue, setTextValue] = useState("");
    const [tasks, setTasks] = useState(false);
    const [saveNotesContents, setSaveNotesContents] = useState({});

    useEffect(() => {
        const savedContent = localStorage.getItem("saveNotesContent");
        if (savedContent) {
            setSaveNotesContents(savedContent);
        }
    }, []);

    useEffect(() => {
        const stored =
            JSON.parse(localStorage.getItem(noteWindow?.notes)) || [];
        setTasks(stored);
    }, [noteWindow]);

    useEffect(() => {
        if (noteWindow) {
            localStorage.setItem(noteWindow.notes, JSON.stringify(tasks));
        }
    }, [tasks, noteWindow]);

    const handleTextAreaChange = (e) => {
        setTextValue(e.target.value); // Update the state with textarea value
        console.log(e.target.value)
    };

    const handleSendText = () => {
        const currentTime = new Date().toLocaleString(); 
        const updatedContent = `${saveNotesContents[noteWindow.notesData] || ''}\n${textValue}: ${currentTime} `;
        setSaveNotesContents({
            ...saveNotesContents,
            [noteWindow.notesData]: updatedContent
        });
        localStorage.setItem("saveNotesContent", JSON.stringify({
            ...saveNotesContents,
            [noteWindow.notesData]: updatedContent
        }));
        setTextValue("");
    };

    return (
        <div className="right-side">
            {noteWindow &&
                <div>
                    <div style={{ fontSize: "50px", background: "#001F8B", height: "80px", display: "flex", flexDirection: "row", gap: "25px" }} className="selected-notes">
                        <span style={{
                            fontSize: "15px",
                            background: noteWindow.colorChoose || "transparent",
                            borderRadius: "50%",
                            padding: "15px",
                            display: "flex",
                            height: "60px",
                            width: "60px",
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: "10px",
                            marginLeft: "20px",
                            color: "#ffffff"
                        }}>{getInitials(noteWindow.notesData)}</span> <span style={{ marginTop: "25px", color: "#ffffff", fontSize: "25px" }}> {noteWindow.notesData} </span>
                    </div>
                    <div>
                        {saveNotesContents[noteWindow.notesData] && <div className="saveNotes">{saveNotesContents[noteWindow.notesData]}</div>}
                    </div>
                    <div style={{ padding: "10px", border: "20px solid #001F8B", position: "fixed", top: "73.4%", background: "#ffffff", borderRadius: "1rem" }}>
                        <textarea name="" id="" value={textValue} cols="109" rows="6" placeholder="Here’s the sample text for sample work" style={{ border: "none", fontSize: "18px" }} onChange={handleTextAreaChange} ></textarea>
                        <img src={vector} alt="send tab" style={{
                            position: "absolute", right: "15px", top: "15vh", height: "25px", cursor: textValue.trim() === "" ? "not-allowed" : "pointer",
                            opacity: textValue.trim() === "" ? 0.5 : 1
                        }} onClick={handleSendText} disabled={textValue.trim() === ""} />
                    </div>
                </div>
                }
            {!noteWindow &&
                <div className="no-selected-notes">
                    <img src={image} className="img1" />
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
