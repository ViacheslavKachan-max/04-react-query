import css from "./MovieModal.module.css";

interface MovieModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
}

export default function MovieModal({
  isOpen,
  onClose,
  title,
  description,
}: MovieModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={css.backdrop} role="presentation" onClick={onClose}>
      <div
        className={css.modal}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className={css.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          x
        </button>
        <h2 className={css.title}>{title}</h2>
        {description ? <p className={css.description}>{description}</p> : null}
      </div>
    </div>
  );
}
