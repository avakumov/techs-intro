import React, { useState, useEffect, useContext } from 'react';
import {Task} from './task'
import { useDrop } from 'react-dnd'

import { ItemTypes } from './utils/items';
import { TaskContext } from './App';

function ListTasks() {
  
  const {moveTask, tasks} = useContext(TaskContext)
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: (item, monitor) => {
        moveTask(item.id, -1)
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  })
  return (
    <div ref={drop}  className={isOver?"list-tasks__container list-tasks__container--drop":"list-tasks__container"}>
      {tasks.filter(t => t.dayId === undefined).map(task => <Task key={task.id} task={task}/>)}

    </div>
  );
}

export {
    ListTasks
}