import React, { createContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTasks } from "../redux/slices/tasksSlice";
import ListColumn from "./ListColumn";

export const BoardContext = createContext();

export default function Board() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const { columns, tasks } = useSelector((state) => state.tasks);

  const boardData = {
    columns: columns,
    tasks: tasks,
  };

  return (
    <BoardContext.Provider value={boardData}>
      <div className="board">
        {columns.length > 0 ? <ListColumn /> : <p>No columns available</p>}
      </div>
    </BoardContext.Provider>
  );
}
