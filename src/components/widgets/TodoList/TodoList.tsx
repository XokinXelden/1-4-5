import "./style.scss";
import Add from "../../shared/assets/icons/add.svg?react";
import { AddEditTaskModal } from "../../features/AddEditTaskModal/AddEditTaskModal";
import { Button } from "../../shared/Button/Button";
import { DeleteModal } from "../../features/DeleteModal/DeleteModal";
import { TaskCard } from "../../entities/TaskCard/TaskCard";
import { Task, taskList } from "../../shared/serverData/taskList";
import { useState } from "react";
import { Priority, Status } from "../../../types";

export const TodoList = () => {
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [targetIdCard, setTargetIdCard] = useState<string | null>(null);
  const [nowTaskList, setNowTaskList] = useState<Task[]>(taskList);
  const [targetTaskCard, setTargetTaskCard] = useState<Partial<Task> | null>(
    null
  );

  const editorTaskCard = (id: string, title: string, priority: Priority) => {
    // способствует актуализации данных при открытии окна редактирования
    setTargetIdCard(id);
    setTargetTaskCard({ title: title, priority: priority });
    setShowAddEditModal(true);
  };
  const closeEditorTaskCard = () => {
    //Закрывает окно редактирования
    setTargetTaskCard(null);
    setShowAddEditModal(false);
  };
  const acceptEditTask = (value: string, prioritySelected: string) => {
    // Редактирует выбранную карту
    if (targetIdCard) {
      const editor = nowTaskList.find((task) => {
        return task.id === targetIdCard;
      });
      if (editor) {
        editor.title =
          value === "" ? "Ебать детей. хочешь ещё раз не дать имя?" : value;
        editor.priority =
          prioritySelected === "high"
            ? Priority.HIGH
            : prioritySelected === "medium"
            ? Priority.MEDIUM
            : Priority.LOW;
      }
    }
    setShowAddEditModal(false);
    setTargetIdCard(null);
    setTargetTaskCard(null);
  };
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
    setShowAddEditModal(false);
    setTargetIdCard(null);
    setTargetTaskCard(null);
  };

  const handleDeleteCard = (id: string) => {
    // Устанавливает таргет на конкретном объекте при выборе его для удаления
    setTargetIdCard(id);
    setShowDeleteModal(true);
  };
  const deleteCard = (id: string) => {
    // Удаляет карту используя фильтрацию
    setNowTaskList(nowTaskList.filter((elem) => elem.id !== id));
  };
  const handleDelete = () => {
    //    Запускается при принятии удаления и производит все необходимые для этого манипуляции
    if (targetIdCard) {
      deleteCard(targetIdCard);
    }
    setTargetIdCard(null);
    setShowDeleteModal(false);
  };
  const handleClose = () => {
    // закрытие окна удаления
    setTargetIdCard(null);
    setShowDeleteModal(false);
  };
  //-----------------------------------------------------------------------------------------------------------------------------------------------------
  return (
    <>
      <div className="page-wrapper">
        <div className="top-title">
          <h2>Список задач</h2>
          <Button
            title="Добавить задачу"
            icon={<Add />}
            onClick={() => {
              setShowAddEditModal(true);
            }}
          />
        </div>
        <div className="task-container">
          {nowTaskList.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              editorTaskCard={() => {
                editorTaskCard(task.id, task.title, task.priority);
              }}
              onShowDeleteModal={() => {
                handleDeleteCard(task.id);
              }}
            />
          ))}
        </div>
      </div>
      {showAddEditModal && (
        <AddEditTaskModal
          onClose={closeEditorTaskCard}
          createNewCard={createNewCard}
          acceptEditTask={acceptEditTask}
          targetTaskCard={targetTaskCard}
        />
      )}
      {showDeleteModal && (
        <DeleteModal onClose={handleClose} confirmDelete={handleDelete} />
      )}
    </>
  );
};
