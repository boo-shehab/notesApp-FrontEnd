import axios from "axios";
import styles from './deletePopup.module.css';

interface DeletePopupProps {
    isOpen: boolean;
    onClose: (id?: string) => void;
    id: string;
}

const DeletePopup = ({ isOpen, onClose, id }: DeletePopupProps) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/${id}`);
            onClose(id);
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.popup}>
            <div className={styles.card}>
                <h1>Are you sure you want to delete this?</h1>
                <div className={styles.actions}>
                    <button type="button" onClick={() => onClose()} className={styles.cancel}>
                        Cancel
                    </button>
                    <button type="button" onClick={handleDelete} className={styles.delete}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeletePopup;
