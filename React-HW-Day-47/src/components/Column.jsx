import React, { useContext } from "react";
import { BoardContext } from "./Board";
import Task from "./Task";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Column({ column, tasks }) {
  const { _id, column: columnOrder, columnName } = column;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: _id,
    data: {
      type: "Column",
      column,
    },
  });

  const quantityOfTasksInColumn = tasks.filter(
    (task) => task.column === columnOrder
  ).length;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (isDragging) {
    const styleOverlay = {
      ...style,
      backgroundColor: "transparent",
      border: "2px solid #000",
      height: "501px",
      width: "400px",
      marginRight: "20px",
      borderRadius: "10px",
    };

    return <div style={styleOverlay} ref={setNodeRef}></div>;
  }

  return (
    <div className="column" ref={setNodeRef} style={style}>
      <div className="column-header" {...attributes} {...listeners}>
        <div className="heading">
          <div className="quantity">{quantityOfTasksInColumn}</div>
          <h2>{columnName}</h2>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 icon-delete"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </div>

      <div className="tasks">
        <SortableContext
          items={tasks.map(({ _id }) => _id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <Task key={task._id} task={task} />
          ))}
        </SortableContext>
      </div>

      <button className="btn-add-task">Add Task</button>
    </div>
  );
}
