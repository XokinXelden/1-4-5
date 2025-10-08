import style from "./style.module.scss";
import Add from "../../shared/assets/icons/add.svg?react";
import { AddEditTaskModal } from "../../features/AddEditTaskModal/AddEditTaskModal";
import { Button } from "../../shared/Button/Button";
import { DeleteModal } from "../../features/DeleteModal/DeleteModal";
import { TaskCard } from "../../entities/TaskCard/TaskCard";
import { Task, taskList } from "../../shared/serverData/taskList";
import { useState } from "react";
import { Priority, Status } from "../../../types";
import { useTypedSelector, useTypedDispatch } from "../../../hook/redux";
import {
  deleteTask,
  editTask,
  showerAddEdit,
  showerDelete,
} from "../../../reducer/TodoSlice";

export const TodoList = () => {
  // const [targetIdCard, setTargetIdCard] = useState<string | null>(null);
  const [nowTaskList, setNowTaskList] = useState<Task[]>(taskList);
  const [targetTaskCard, setTargetTaskCard] = useState<Partial<Task> | null>(
    null
  );

  // const acceptEditTask = (value: string, prioritySelected: string) => {
  //   // Редактирует выбранную карту
  //   if (targetIdCard) {
  //     const editor = nowTaskList.find((task) => {
  //       return task.id === targetIdCard;
  //     });
  //     if (editor) {
  //       editor.title =
  //         value === "" ? "Ебать детей. хочешь ещё раз не дать имя?" : value;
  //       editor.priority =
  //         prioritySelected === "high"
  //           ? Priority.HIGH
  //           : prioritySelected === "medium"
  //           ? Priority.MEDIUM
  //           : Priority.LOW;
  //     }
  //   }
  //   // setShowAddEditModal(false);
  //   setTargetIdCard(null);
  //   setTargetTaskCard(null);
  // };
  const createNewCard = (value: string, priority: string) => {
    //Создаёт новую карту
    let newId = 0;
    const lastElem = nowTaskList.length;
    for (let i = 1; newId === 0; i++) {
      if (
        !nowTaskList.some((elem) => {
          return +elem.id === i;
        })
      ) {
        newId = i;
      }

      if (newId === 0 && i >= lastElem) newId = i + 1;
    }
    const newTaskCard = {
      id: newId < 10 ? `0${newId}` : `${newId}`,
      title: value === "" ? "Безымянная задача :С" : value,
      priority:
        priority === "high"
          ? Priority.HIGH
          : priority === "medium"
          ? Priority.MEDIUM
          : Priority.LOW,
      status: Status.TODO,
      progress: 0,
    };
    setNowTaskList([newTaskCard, ...nowTaskList]);
    // setShowAddEditModal(false);
    // setTargetIdCard(null);
    setTargetTaskCard(null);
  };

  //-----------------------------------------------------------------------------------------------------------------------------------------------------
  const dispatch = useTypedDispatch();
  const todoTaskListR = useTypedSelector((state) => state.todoReducer.todoList);
  const showModalDelete = useTypedSelector(
    (state) => state.todoReducer.showDeleteModal
  );
  const showModalAddEdit = useTypedSelector(
    (state) => state.todoReducer.showAddEditModal
  );

  return (
    <>
      <div className={style.pageWrapper}>
        <div className={style.topTitle}>
          <h2>Список задач</h2>
          <Button
            title="Добавить задачу"
            icon={<Add />}
            onClick={() => {
              dispatch(showerAddEdit());
            }}
          />
        </div>
        <div className={style.taskContainer}>
          {todoTaskListR.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              editorTaskCard={() => {
                dispatch(
                  showerAddEdit({
                    id: task.id,
                    title: task.title,
                    priority: task.priority,
                  })
                );
                // editorTaskCard(task.id, task.title, task.priority);
              }}
              onShowDeleteModal={() => {
                dispatch(showerDelete({ id: task.id }));
              }}
            />
          ))}
        </div>
      </div>
      {showModalAddEdit && (
        <AddEditTaskModal
          onClose={() => dispatch(showerAddEdit({ close: "close" }))}
          createNewCard={createNewCard}
          acceptEditTask={() => dispatch(editTask({}))}
          targetTaskCard={targetTaskCard}
        />
      )}
      {showModalDelete && (
        <DeleteModal
          onClose={() => dispatch(showerDelete({ close: "close" }))}
          confirmDelete={() => dispatch(deleteTask())}
        />
      )}
    </>
  );
};
