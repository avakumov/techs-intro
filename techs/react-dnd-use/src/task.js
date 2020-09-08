import React, { useState, useEffect } from 'react';
import { useDrag } from 'react-dnd'
import { DragSource } from 'react-dnd'
import { ItemTypes } from './utils/items';

function Task({task}) {

    const [{isDragging}, drag] = useDrag({
        item: { 
            type: ItemTypes.TASK, 
            id: task.id
            },
        collect: monitor => ({
          isDragging: !!monitor.isDragging(),
        }),
      })
  return (
    <div ref={drag} className="task__container">
        {task.title}

    </div>
  );
}

function TaskMini({task}) {

    const [{isDragging}, drag] = useDrag({
        item: { 
            type: ItemTypes.TASK, 
            id: task.id
        },
        collect: monitor => ({
          isDragging: !!monitor.isDragging(),
        }),
      })
  return (
    <div ref={drag} className="task-mini__container">
        {task.id}

    </div>
  );
}

export {
    Task,
    TaskMini
}