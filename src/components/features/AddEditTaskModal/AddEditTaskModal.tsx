import classNames from "classnames";
import Close from "../../shared/assets/icons/close.svg?react";
import { Button } from "../../shared/Button/Button";
import { Input } from "../../shared/Input/Input";
import { Modal } from "../../shared/Modal/Modal";
import style from "./style.module.scss";
import { useState } from "react";
import { Task } from "../../shared/serverData/taskList";

type onCloser = {
  targetTaskCard: Partial<Task> | null;
  onClose: () => void;
  createNewCard: (value: string, priority: string) => void;
  acceptEditTask: (value: string, prioritySelected: string) => void;
};

export const AddEditTaskModal = ({
  targetTaskCard,
  onClose,
  createNewCard,
  acceptEditTask,
}: onCloser) => {
  const [prioritySelected, setPrioritySelected] = useState<string>(
    targetTaskCard?.priority ? targetTaskCard.priority : "medium"
  );
  const [value, setValue] = useState<string>(
    targetTaskCard?.title ? targetTaskCard.title : ""
  );

  return (
    <Modal>
      <form>
        <div className={style.addEditModal}>
          <div className="flx-between">
            <span className={style.modalTitle}>
              {targetTaskCard?.title
                ? "Редактировать задачу"
                : "Добавить задачу"}
            </span>
            <Close className="cp" onClick={onClose} />
          </div>
          <Input
            label="Задача"
            placeholder="Введите текст.."
            onChange={(e) => {
              setValue(e.target.value);
            }}
            name="title"
            value={value}
          />
          <div className={style.modalPriority}>
            <span>Приоритет</span>
            <ul className={style.priorityButtons}>
              {["high", "medium", "low"].map((priority) => (
                <li
                  key={priority}
                  className={classNames(
                    priority === "high"
                      ? style.high
                      : priority === "medium"
                      ? style.medium
                      : style.low,
                    priority === prioritySelected && style.Selected
                  )}
                  onClick={() => {
                    setPrioritySelected(priority);
                  }}
                >
                  {priority === "high"
                    ? "Высокий"
                    : priority === "medium"
                    ? "Средний"
                    : "Низкий"}
                </li>
              ))}
            </ul>
          </div>
          <div className="flx-right mt-50">
            <Button
              title={targetTaskCard?.title ? "Редактировать " : "Добавить"}
              onClick={() => {
                targetTaskCard?.title
                  ? acceptEditTask(value, prioritySelected)
                  : createNewCard(value, prioritySelected);
              }}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};
