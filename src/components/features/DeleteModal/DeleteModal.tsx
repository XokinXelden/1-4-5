import { Button } from "../../shared/Button/Button";
import { Modal } from "../../shared/Modal/Modal";
import "./style.scss";

export const DeleteModal = ({
  onClose,
  confirmDelete,
}: {
  onClose: () => void;
  confirmDelete: () => void;
}) => {
  return (
    <Modal>
      <div className="delete-modal">
        <p>Точно удалить задачу?</p>
        <div className="delete-modal__actions">
          <Button title="Удалить" onClick={confirmDelete} />
          <Button title="Выйти" outline onClick={onClose} />
        </div>
      </div>
    </Modal>
  );
};
