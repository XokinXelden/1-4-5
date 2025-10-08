import classNames from "classnames";
import Close from "../../shared/assets/icons/close.svg?react";
import { Button } from "../../shared/Button/Button";
import { Input } from "../../shared/Input/Input";
import { Modal } from "../../shared/Modal/Modal";
import style from "./style.module.scss";
import { Task } from "../../shared/serverData/taskList";
import { useTypedDispatch, useTypedSelector } from "../../../hook/redux";
import {
  actualPriority,
  actualTitle,
  editTask,
} from "../../../reducer/TodoSlice";

type onCloser = {
  targetTaskCard: Partial<Task> | null;
  onClose: () => void;
  createNewCard: (value: string, priority: string) => void;
  acceptEditTask: () => void;
};

export const AddEditTaskModal = ({ onClose, createNewCard }: onCloser) =>
  // onClose: AppDispatch
  {
    const actualTarget = useTypedSelector(
      (state) => state.todoReducer.actualTargetID
    );
    const title = actualTarget?.title ?? "";
    const priority = actualTarget?.priority ?? "medium";
    // const [prioritySelected, setPrioritySelected] = useState<string>(
    //   actualTarget?.priority ? actualTarget.priority : "medium"
    // );
    // const [value, setValue] = useState<string>(
    //   actualTarget?.title ? actualTarget.title : ""
    // );

    const dispatch = useTypedDispatch();

    return (
      <Modal>
        <form>
          <div className={style.addEditModal}>
            <div className="flx-between">
              <span className={style.modalTitle}>
                {title ? "Редактировать задачу" : "Добавить задачу"}
              </span>
              <Close className="cp" onClick={onClose} />
            </div>
            <Input
              label="Задача"
              placeholder="Введите текст.."
              onChange={(e) => {
                dispatch(actualTitle({ title: e.target.value }));
              }}
              name="title"
              value={title ?? ""}
            />
            <div className={style.modalPriority}>
              <span>Приоритет</span>
              <ul className={style.priorityButtons}>
                {["high", "medium", "low"].map((priori) => (
                  <li
                    key={priori}
                    className={classNames(
                      priori === "high"
                        ? style.high
                        : priori === "medium"
                        ? style.medium
                        : style.low,
                      priori === priority && style.Selected
                    )}
                    onClick={() => {
                      dispatch(actualPriority({ priority: priori })); ////////////////////////////////////////////////////////
                    }}
                  >
                    {priori === "high"
                      ? "Высокий"
                      : priori === "medium"
                      ? "Средний"
                      : "Низкий"}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flx-right mt-50">
              <Button
                title={title ? "Редактировать " : "Добавить"}
                onClick={() => {
                  title
                    ? // ? acceptEditTask(value, prioritySelected)
                      dispatch(editTask())
                    : createNewCard(title, priority);
                }}
              />
            </div>
          </div>
        </form>
      </Modal>
    );
  };
