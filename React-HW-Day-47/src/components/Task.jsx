import React from "react";
import { tasksSlice } from "../redux/slices/tasksSlice";
import { useDispatch } from "react-redux";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const { deleteTask } = tasksSlice.actions;
function Task({ task }) {
  const { _id: id, content } = task;
  const dispatch = useDispatch();

  const handleClickDeleteTask = () => {
    dispatch(deleteTask(id));
  };

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: {
      type: "Task",
      task,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: isDragging ? "#183D3D" : "white",
    padding: "20px 15px",
    marginBottom: "10px",
    borderRadius: "4px",
    fontWeight: 700,
    cursor: "grab",
    opacity: isDragging ? 0.3 : 1,
  };

  const styleButtonAdd = {
    width: "20px",
    transition: "0.3s linear",
    transitionProperty: "color, visibility, opacity",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="task"
    >
      <p>{content}</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        style={styleButtonAdd}
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 icon-delete"
        onClick={handleClickDeleteTask}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        />
      </svg>
    </div>
  );
}

export default Task;
