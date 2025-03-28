import axios from "axios"
import styles from './deletePopup.module.css'
const DeletePopup = ({isOpen, onClose, id}) => {
    const handleDelete = async() => {
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/${id}`);
            onClose(id)
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    }

    if(!isOpen) return
    return (
        <div className={styles.popup}>
            <div className={styles.card}>
                <h1>are you sure you want to delete this? </h1>
                    <div className={styles.actions}>
                        <button type="button" onClick={() => onClose()} className={styles.cancel}>
                            cancel
                        </button>
                        <button type="button" onClick={handleDelete} className={styles.delete}>
                            delete
                        </button>
                    </div>
            </div>
        </div>
    )
}

export default DeletePopup