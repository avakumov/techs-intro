import React, { useState, useEffect } from 'react';
import {TaskMini}  from './task'

import { useDrop } from 'react-dnd'
import { ItemTypes } from './utils/items';
import { useContext } from 'react';
import { TaskContext } from './App';

function Day({day}) {
    
    const {tasks, moveTask} = useContext(TaskContext)

    const tasksOwnDay = tasks.filter(task => task.dayId === day.id)

    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.TASK,
        drop: (item, monitor) => {
            moveTask(item.id, day.id)
        },
        collect: monitor => ({
          isOver: !!monitor.isOver(),
        }),
      })
  return (
    <div  ref={drop} className={isOver?"day__container day__container--drop":"day__container"}>

        {day.value}
        <div className="day__tasks">
            {tasksOwnDay && tasksOwnDay.map(task => <TaskMini key={task.id} task={task}/>)}
        </div>
        
    </div>
  );
}

export {
    Day
}