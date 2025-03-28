import { useEffect, useState } from "react";
import styles from "./notesForm.module.css";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

interface NoteData {
    id: string;
    title: string;
    contents: string;
    created: string;
}

interface NotesFormProps {
    isOpen: boolean;
    data: NoteData | null;
    onClose: (note?: NoteData) => void; 
}

const NotesForm = ({ isOpen, data, onClose }: NotesFormProps) => {
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");

    const handleClose = () => {
        setTitle("");
        setContents("");
        onClose(); 
    };

    const handleSubmit = async () => {
        try {
            if (data?.id) {
                const response = await axios.put(`${API_URL}/${data.id}`, { title, contents }, {
                    headers: { "Content-Type": "application/json" }
                });
                console.log("Updated Note:", response.data);
                onClose(response.data); 
            } else {
                const response = await axios.post(API_URL, { title, contents }, {
                    headers: { "Content-Type": "application/json" }
                });
                console.log("New Note:", response.data);
                onClose(response.data); 
            }
        } catch (error) {
            console.error("Error saving note:", error);
        }
    };

    useEffect(() => {
        if (data) {
            setTitle(data.title || "");
            setContents(data.contents || "");
        }
    }, [data]);

    if (!isOpen) return null;

    return (
        <div className={styles.popup}>
            <div className={styles.card}>
                <h1>{data ? "Edit Note" : "New Note"}</h1>
                <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <label htmlFor="content">Content</label>
                    <textarea
                        id="content"
                        value={contents}
                        onChange={(e) => setContents(e.target.value)}
                        required
                    />

                    <button type="button" onClick={handleSubmit} className={styles.submit}>
                        Submit
                    </button>
                    <button type="button" onClick={handleClose} className={styles.close}>
                        Close
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NotesForm;
