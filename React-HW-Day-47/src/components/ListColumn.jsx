import React, { useContext, useState } from "react";
import { createPortal } from "react-dom";
import { BoardContext } from "./Board";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import Column from "./Column";
import { useDispatch } from "react-redux";
import { tasksSlice } from "../redux/slices/tasksSlice";
import Task from "./Task";

const { updateColumns, updateTasks } = tasksSlice.actions;

export default function ListColumn() {
  const dispatch = useDispatch();
  const { columns, tasks } = useContext(BoardContext);
  const [activeColumn, setActiveColumn] = useState(null);
  const [activeTask, setActiveTask] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const handleDragStart = (event) => {
    if (event.active.data.current.type === "Column") {
      setActiveColumn(event.active.data.current.column);
    }

    if (event.active.data.current.type === "Task") {
      setActiveTask(event.active.data.current.task);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveColumn(null);
    setActiveTask(null);

    if (!over || active.id === over.id) return;

    if (
      active.data.current.type === "Column" &&
      over.data.current.type === "Column"
    ) {
      const activeColumnIndex = columns.findIndex(
        (column) => active.id === column._id
      );
      const overColumnIndex = columns.findIndex(
        (column) => over.id === column._id
      );
      dispatch(
        updateColumns(arrayMove(columns, activeColumnIndex, overColumnIndex))
      );
    }

    if (
      active.data.current.type === "Task" &&
      over.data.current.type === "Task"
    ) {
      const activeTaskIndex = tasks.findIndex((task) => task._id === active.id);
      const overTaskIndex = tasks.findIndex((task) => task._id === over.id);
      dispatch(updateTasks(arrayMove(tasks, activeTaskIndex, overTaskIndex)));
    }
  };

  const handleDragOver = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    if (
      active.data.current.type === "Task" &&
      over.data.current.type === "Column"
    ) {
      const { delta } = event;
      const activeTaskIndex = tasks.findIndex((task) => task._id === active.id);

      const newTasks = [...tasks];
      const changeActiveTask = {
        ...newTasks[activeTaskIndex],
        column: over.data.current.column.column,
      };

      newTasks.splice(
        newTasks.findIndex((task) => task._id === active.id),
        1
      );
      const insertIndex = delta.y < 0 ? 0 : newTasks.length;
      newTasks.splice(insertIndex, 0, changeActiveTask);

      dispatch(updateTasks(newTasks));
    }

    if (
      active.data.current.task &&
      active.data.current.task.column !== over.data.current.task.column
    ) {
      const activeTaskIndex = tasks.findIndex((task) => task._id === active.id);
      const newTasks = [...tasks];
      const changeActiveTask = {
        ...newTasks[activeTaskIndex],
        column: over.data.current.task.column,
      };
      newTasks[activeTaskIndex] = changeActiveTask;
      dispatch(updateTasks(newTasks));
    }
  };

  return (
    <div className="list-column">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <SortableContext
          items={columns.map(({ _id }) => _id)}
          strategy={horizontalListSortingStrategy}
        >
          {columns.map((column) => (
            <Column
              key={column._id}
              column={column}
              tasks={tasks.filter((task) => task.column === column.column)}
            />
          ))}
        </SortableContext>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <Column
                column={activeColumn}
                tasks={tasks.filter(
                  (task) => task.column === activeColumn.column
                )}
              />
            )}
            {activeTask && <Task task={activeTask} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>

      <button className="btn-add-column">Add Column</button>
    </div>
  );
}
