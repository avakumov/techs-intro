import React, { useState, useContext } from 'react';
import {Day} from './day'
import { TaskContext } from './App';

function Calendar() {
    
    const {days} = useContext(TaskContext)
  return (
    <div className="calendar__container">
        {days.map(day => <Day key={day.id} day={day}/>)}

    </div>
  );
}

export {
    Calendar
}