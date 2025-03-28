import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import NotesForm from "../../components/NotesForm/NotesForm";
import DeletePopup from "../../components/DeletePopup/DeletePopup";

interface Note {
    id: string;
    title: string;
    contents: string;
    created: string;
}

const HomePage = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [deletedId, setDeletedId] = useState<string | null>(null);
    const [editData, setEditData] = useState<Note | null>(null);
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        axios
            .get(import.meta.env.VITE_BACKEND_URL)
            .then((response) => {
                const notesWithCreated = response.data.map((note: Note) => ({
                    ...note,
                    created: new Date().toISOString(),
                }));
                setNotes(notesWithCreated);
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <main className={styles.main}>
            <div className="container">
                <button
                    className={styles.button}
                    onClick={() => setIsFormOpen(true)}
                >
                    New Note
                </button>
                <div className={styles.cardsContainer}>
                    {notes.map((note) => (
                        <div key={note.id} className={styles.card}>
                            <div className={styles.cardData}>
                                <span className={styles.cardDate}>
                                    {new Date(note.created).toLocaleString()}
                                </span>
                                <h2 className={styles.cardTitle}>{note.title}</h2>
                                <p>{note.contents}</p>
                            </div>

                            <div className={styles.actions}>
                                <button
                                    className={styles.edit}
                                    onClick={() => {
                                        setEditData(note);
                                        setIsFormOpen(true);
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    className={styles.delete}
                                    onClick={() => {
                                        setIsDeleteOpen(true);
                                        setDeletedId(note.id);
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <DeletePopup
                isOpen={isDeleteOpen}
                onClose={(id) => {
                    if (id) setNotes(notes.filter((note) => note.id !== id));
                    setIsDeleteOpen(false);
                    setDeletedId(null); // Reset deletedId when closing popup
                }}
                id={deletedId || ""}
            />

            <NotesForm
                isOpen={isFormOpen}
                data={editData}
                onClose={(data) => {
                    if (data) {
                        if (editData) {
                            setNotes(
                                notes.map((note) =>
                                    note.id === data.id ? data : note
                                )
                            );
                        } else {
                            setNotes([...notes, data]);
                        }
                    }
                    setEditData(null);
                    setIsFormOpen(false);
                }}
            />
        </main>
    );
};

export default HomePage;
