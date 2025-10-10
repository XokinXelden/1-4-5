import style from "./style.module.scss";
import Add from "../../shared/assets/icons/add.svg?react";
import { AddEditTaskModal } from "../../features/AddEditTaskModal/AddEditTaskModal";
import { Button } from "../../shared/Button/Button";
import { DeleteModal } from "../../features/DeleteModal/DeleteModal";
import { TaskCard } from "../../entities/TaskCard/TaskCard";
import { useTypedSelector, useTypedDispatch } from "../../../hook/redux";
import {
  deleteTask,
  showerAddEdit,
  showerDelete,
} from "../../../reducer/TodoSlice";

export const TodoList = () => {
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
