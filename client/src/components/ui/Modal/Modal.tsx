import styles from './Modal.module.scss';

interface IModalProps {
  show: boolean;
  onHide: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal = ({ show, onHide, title, children } : IModalProps) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalOverlay} onClick={onHide}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h5 className={styles.modalTitle}>{title}</h5>
          <button type="button" className={styles.closeButton} onClick={onHide}>
            <span>&times;</span>
          </button>
        </div>
        <div className={styles.modalBody}>
          {children}
        </div>
      </div>
    </div>
  );
};