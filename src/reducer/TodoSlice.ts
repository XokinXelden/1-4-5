import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Task, taskList } from "../components/shared/serverData/taskList";
import { Priority, Status } from "../types";

type ActualTargetID = { id?: string; title?: string; priority?: string };

type TodoState = {
  todoList: Task[];
  showAddEditModal: boolean;
  showDeleteModal: boolean;
  actualTargetID?: ActualTargetID;
};
type ShowerDeletePayload = undefined | { id?: string; close?: "close" };
type ShowerEditPayload =
  | undefined
  | { id?: string; title?: string; priority?: string; close?: "close" };
const initialState: TodoState = {
  todoList: [...taskList],
  showAddEditModal: false,
  showDeleteModal: false,
  actualTargetID: undefined,
};

export const todoSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    // Добавить
    addTask: (state) => {
      let newId: number = 0;
      const lastElem = state.todoList.length;
      const title = state.actualTargetID?.title;
      const priority = state.actualTargetID?.priority as Priority;
      for (let i = 1; newId === 0; i++) {
        if (
          !state.todoList.some((elem) => {
            return +elem.id === i;
          })
        ) {
          newId = i;
        }

        if (newId === 0 && i >= lastElem) newId = i + 1;
      }
      const newTaskCard = {
        id: newId < 10 ? `0${newId}` : `${newId}`,
        title: title === "" ? "Безымянная задача :С" : title ?? "",
        priority: priority ?? Priority.MEDIUM,
        status: Status.TODO,
        progress: 0,
      };
      state.todoList = [newTaskCard, ...state.todoList];
      state.actualTargetID = undefined;
      state.showAddEditModal = !state.showAddEditModal;
    },
    // Удалить
    deleteTask: (state) => {
      const id = state.actualTargetID?.id;
      state.todoList = state.todoList.filter((elem) => elem.id !== id);
      state.actualTargetID = undefined;
      state.showDeleteModal = !state.showDeleteModal;
    },
    // Редактировать

    editTask: (state) => {
      if (!state.actualTargetID) return;
      const { id, title, priority } = state.actualTargetID;

      const newState = state.todoList.find((task) => task.id === id);
      if (newState) {
        if (newState.priority && newState.title) {
          newState.priority = priority as Priority;
          newState.title =
            title === "" ? "Ебать много детей!" : (title as string);
        }
      }

      state.actualTargetID = undefined;
      state.showAddEditModal = !state.showAddEditModal;
    },

    // Изменение статуса таска
    statusTask: (state, action) => {
      const id = action.payload.id;
      const newState = state.todoList.find((task) => task.id === id);

      if (!newState) return;

      switch (action.payload.status) {
        case "todo":
          newState.status = Status.PROGRESS;
          newState.progress = 50;
          break;
        case "progress":
          newState.status = Status.DONE;
          newState.progress = 100;
          break;
        case "done":
          newState.status = Status.TODO;
          newState.progress = 0;
          break;
        default:
          throw new Error("Ошибка при выборе progress");
      }
    },
    //shower
    showerDelete: (state, action: PayloadAction<ShowerDeletePayload>) => {
      const id = action.payload?.id;
      if (action.payload?.close === "close") {
        state.actualTargetID = undefined;
      } else if (id) {
        state.actualTargetID = { id: id };
      }
      state.showDeleteModal = !state.showDeleteModal;
    },
    showerAddEdit: (state, action: PayloadAction<ShowerEditPayload>) => {
      const id = action.payload?.id;
      if (action.payload?.close === "close") {
        state.actualTargetID = undefined;
      } else if (id) {
        state.actualTargetID = {
          id: id,
          title: action.payload?.title,
          priority: action.payload?.priority,
        };
      }
      state.showAddEditModal = !state.showAddEditModal;
    },
    actualPriority: (state, action) => {
      const priority = action.payload.priority;

      if (state.actualTargetID?.priority) {
        state.actualTargetID.priority = priority;
      } else if (state.actualTargetID) {
        state.actualTargetID = {
          ...state.actualTargetID,
          priority: priority,
        };
      } else {
        state.actualTargetID = { priority: priority };
      }
    },
    actualTitle: (state, action) => {
      const titleActual = action.payload.title;
      if (!state.actualTargetID?.title) {
        state.actualTargetID = { ...state.actualTargetID, title: "" };
      }
      state.actualTargetID.title = titleActual;
    },
  },
});

export const {
  addTask,
  deleteTask,
  editTask,
  statusTask,
  showerDelete,
  showerAddEdit,
  actualTitle,
  actualPriority,
} = todoSlice.actions;
export default todoSlice.reducer;
