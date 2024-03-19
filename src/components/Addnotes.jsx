import React, { useState, useRef ,useEffect} from "react";
const colors = [
    "#B38BFA",
    "#FF79F2",
    "#43E6FC",
    "#F19576",
    "#0047FF",
    "#6691FF",
];

const getInitials = (name) => {
    if (!name) return ""; // Check if name is undefined or null
    const words = name.split(" ");
    const initials = words.map((word) => word[0]);
    return initials.join(" ").toUpperCase();
};

function Addnotes({ onGroupSelect }) {
    const [modal, setModal] = useState(false);
    const [notesData, setNotesData] = useState("");
    //const [notes, setNotes] = useRef(JSON.parse(localStorage.getItem("Notes")) || []);
    //const notesRef = useRef(JSON.parse(localStorage.getItem("Notes")) || []);
    const notesRef = useRef(null); // Initialize as null
    const [colorChoose, setColorChoose] = useState(colors[0]);
    const [showBox, setShowBox] = useState(false);

    useEffect(() => {
        // Load data from localStorage if notesRef is not initialized
        if (!notesRef.current) {
            const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
            notesRef.current = storedNotes;
        }
    }, []);
    
    const newChanges = () => {
        setNotesData("");
    };
    const handleChange = (e) => {
        setNotesData(e.target.value);
    };

    const handleColor = (color) => {
        setColorChoose(color);
    };

    const createNotes = () => {
        setModal(!modal);

        if (notesData === "") {
            alert("Please enter the name ");
            return;
        } 

        const newNote = {
            notesData,
            colorChoose,
        };

        const updatedNotes = [...notesRef.current, newNote];
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
        notesRef.current = updatedNotes;

        setColorChoose(colors[0]);
        newChanges();
    };
    const handleGroupClick = (index) => {
        const selectedGroup = notesRef.current[index];
        onGroupSelect(selectedGroup);
    };

    return (
        <div className="left-side">
            <p className="heading"> Pocket Notes</p>
            <button className="addButton" onClick={() => setModal(!modal)}>
                +
            </button>

            {modal && (
                <div className="modal">
                    <div className="overlay"></div>
                    <div className="CreateWindow">
                        <h2 className="title">Create New Group</h2>
                        <label htmlFor="note" className="noteName">
                            Group Name
                        </label>
                        <input
                            className="name"
                            type="text"
                            id="note"
                            placeholder="Enter Group Name"
                            name="name"
                            value={notesData}
                            onChange={handleChange}
                        />
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: "2vw",
                                marginTop: "3vh",
                            }}
                        >
                            <div>
                                <ul className="color-list">
                                    Choose the colors:
                                    {colors.map((color, index) => (
                                        <li
                                            key={index}
                                            style={{
                                                backgroundColor: color,
                                                marginLeft: "5px",
                                                marginTop: "-1px",
                                                cursor: "pointer",
                                                border: color === colorChoose ? "2px solid #000" : "",
                                            }}
                                            onClick={() => handleColor(color)}
                                        ></li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <button className="Create" onClick={createNotes}>
                            Create
                        </button>
                    </div>
                </div>
            )}

            {!modal && (
                <div className="notes-container">
                    {Array.isArray(notesRef.current) &&
                        notesRef.current.map((note, index) => (
                            <div
                                className="individualNote"
                                key={index}
                                onClick={() => handleGroupClick(index)}
                            >
                                <span
                                    style={{
                                        fontSize: "20px",
                                        background: note.colorChoose,
                                        borderRadius: "50%",
                                        padding: "15px",
                                        height: "70px",
                                        display: "flex",
                                        width: "70px", 
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >
                                    {getInitials(note.notesData)}
                                </span>
                                <span className="note-Name" >{note.notesData}</span>
                            </div>
                        ))}
                </div>
            )}

        </div>
    );
}
export default Addnotes;
