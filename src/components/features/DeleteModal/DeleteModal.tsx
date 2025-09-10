import { Button } from "../../shared/Button/Button";
import { Modal } from "../../shared/Modal/Modal";
import style from "./style.module.scss";

export const DeleteModal = ({
  onClose,
  confirmDelete,
}: {
  onClose: () => void;
  confirmDelete: () => void;
}) => {
  return (
    <Modal>
      <div className={style.deleteModal}>
        <p>Точно удалить задачу?</p>
        <div className={style.deleteModalActions}>
          <Button title="Удалить" onClick={confirmDelete} />
          <Button title="Выйти" outline onClick={onClose} />
        </div>
      </div>
    </Modal>
  );
};
