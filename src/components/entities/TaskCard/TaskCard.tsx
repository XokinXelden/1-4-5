import classNames from "classnames";
import DeleteIcon from "../../shared/assets/icons/delete.svg?react";
import EditIcon from "../../shared/assets/icons/edit.svg?react";
import { CircularProgressBar } from "../../shared/CircularProgressBar/CircularProgressBar";
import style from "./style.module.scss";
import { useState } from "react";

type TaskType = {
  id: string;
  title: string;
  priority: string;
  status: string;
  progress: number;
};

type AllPropsType = {
  task: TaskType;

  onShowDeleteModal: () => void;
  editorTaskCard: (id: string, title: string, priority: string) => void;
};
export const TaskCard = ({
  task: { id, title, priority, status, progress },
  onShowDeleteModal,
  editorTaskCard,
}: AllPropsType) => {
  const [statusUse, setStatusUse] = useState<string>(status);
  const toDoSwap = () => {
    switch (statusUse) {
      case "todo":
        setStatusUse("progress");
        break;
      case "progress":
        setStatusUse("done");
        break;
      case "done":
        setStatusUse("todo");
    }
  };
  return (
    <div className={style.taskCard}>
      <div className="flex w-100">
        <span className={style.taskTitle}>Задача</span>
        <span className={style.task}>{title}</span>
      </div>
      <div className="flex">
        <span className={style.priorityTitle}>Приоритет</span>
        <span
          className={classNames(
            priority === "high"
              ? style.highPriority
              : priority === "medium"
              ? style.mediumPriority
              : style.lowPriority,
            style.priority
          )}
        >
          {priority === `high`
            ? `Высокий`
            : priority === `medium`
            ? `Средний`
            : `Низкий`}
        </span>
      </div>
      <div className={style.taskStatusWrapper}>
        <button
          className={classNames(
            statusUse === "done"
              ? style.statusDone
              : statusUse === "progress"
              ? style.statusProgress
              : null,
            style.status
          )}
          onClick={() => {
            toDoSwap();
          }}
        >
          {statusUse === `todo`
            ? `Сделать`
            : statusUse === `progress`
            ? `В процессе`
            : `Сделано`}
        </button>
      </div>
      <div className={style.progress}>
        <CircularProgressBar
          strokeWidth={2}
          sqSize={24}
          percentage={progress}
        />
      </div>
      <div className={style.actions}>
        <EditIcon
          className="mr-20 cp"
          onClick={() => {
            editorTaskCard(id, title, priority);
          }}
        />
        <DeleteIcon className="cp" onClick={onShowDeleteModal} />
      </div>
    </div>
  );
};
