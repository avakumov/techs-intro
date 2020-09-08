import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ListTasks } from "./list-tasks";
import { Calendar } from "./calendar";
import { createContext } from "react";

const daysData = [
  { id: 1, value: '1 сентября', },
  { id: 2, value: '2 сентября', },
  { id: 3, value: '3 сентября' },
  { id: 4, value: '4 сентября' },
  { id: 5, value: '5 сентября' },
  { id: 6, value: '6 сентября' },
  { id: 7, value: '7 сентября' },
  { id: 8, value: '8 сентября' },
  { id: 9, value: '9 сентября' },
  { id: 10, value: '10 сентября' },
  { id: 11, value: '11 сентября' },
  { id: 12, value: '12 сентября' },
];
const tasksData = [
  { id: 1, title: "task 1" , dayId: 1},
  { id: 2, title: "tsk2" },
  { id: 3, title: "tsk3" },
  { id: 4, title: "tsk4" },
  { id: 5, title: "tsk5" },
  { id: 6, title: "tsk6" },
];

export const TaskContext = createContext({
  tasksDone: null,
});

function App() {
  const [days, setDays] = useState(daysData)
  const [tasks, setTasks] = useState(tasksData);

  const moveTask = (tskId, dayId) => {
    const indexTask = tasks.findIndex((task) => task.id === tskId);
    const copyTasks = [...tasks]
    if (dayId === -1) {
      delete copyTasks[indexTask].dayId
    } else {
    copyTasks[indexTask].dayId = dayId
    }
    setTasks(copyTasks)
  };

  return (
    <TaskContext.Provider value={{ moveTask, days, tasks }}>
      <DndProvider backend={HTML5Backend}>
        <div className="container">
          <div className="main__container">
            <ListTasks/>
            <Calendar/>
          </div>
        </div>
      </DndProvider>
    </TaskContext.Provider>
  );
}

export default App;
