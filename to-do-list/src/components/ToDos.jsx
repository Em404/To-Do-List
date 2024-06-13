import React, { Fragment, useState } from 'react'
import { useAtom } from 'jotai';
import { toDosAtom, deletedToDosAtom, doneToDosAtom } from '../atom';

export const ToDos = () => {

  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useAtom(toDosAtom);
  const [deletedToDos, setDeletedToDos] = useAtom(deletedToDosAtom);
  const [doneToDos, setDoneToDos] = useAtom(doneToDosAtom);
  const [error, setError] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleChangeToDo = (event) => {
    setToDo(event.target.value);
    if (event.target.value.trim() !== '') {
      setError(false);
    }
  }

  const saveToDo = () => {
    if (toDo.trim() === '') {
      setError(true);
      return;
    }
    
    if (editIndex !== null) {
      // Edit existing task
      const updatedToDos = [...toDos];
      updatedToDos[editIndex] = toDo;
      setToDos(updatedToDos);
      setEditIndex(null); // Reset edit index after saving
    } else {
      // Add new task
      const newTodos = [...toDos];
      newTodos.push(toDo);
      setToDos(newTodos);
    }
    
    setToDo('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      saveToDo();
    }
  };

  const handleDelete = (index) => {
    const newToDos = [...toDos];
    const deletedToDo = newToDos.splice(index, 1);
    setToDos(newToDos);
    setDeletedToDos([...deletedToDos, ...deletedToDo]);
  };

  const handleDone = (index) => {
    const newToDos = [...toDos]
    const doneTodo = newToDos.splice(index, 1)
    setToDos(newToDos)
    setDoneToDos([...doneToDos, ...doneTodo])
  }

  const handleEdit = (index) => {
    setToDo(toDos[index]);
    setEditIndex(index);
  };

  const checkIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" height={14} width={14} viewBox="0 0 448 512">
    <path fill="#22c55e" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
    </svg>
  )

  const trashIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" height={14} width={14} viewBox="0 0 448 512">
    <path fill="#ef4444" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
    </svg>
  )

  const editIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 512 512">
    <path fill="#f97316" d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/>
    </svg>
  )

  const addIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" height="36" width="36" viewBox="0 0 512 512">
    <path fill="#ffffff" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/>
    </svg>
  )
  return (
    <Fragment>
      <div className='flex flex-col justify-between h-[90vh] lg:h-screen'>
        <div className='mt-12 mb-12 overflow-auto text-center lg:text-left font-semibold text-xl'>
          {toDos.length === 0 ? 'Your list is empty' : toDos.map((todo, index) => {
            return (
              <div key={index} className='flex justify-between glass px-4 py-4 my-4 rounded-lg text-base font-normal'>
                <p>{todo}</p>
                <div className='flex'>
                  <button className='hover:scale-125 duration-300' onClick={() => handleDone(index)}>{checkIcon}</button>
                  <button className='hover:scale-125 duration-300 mx-4'onClick={() => handleEdit(index)}>{editIcon}</button>
                  <button className='hover:scale-125 duration-300' onClick={() => handleDelete(index, [...toDos], setToDos)}>{trashIcon}</button>
                </div>
              </div>
            )
          })}
        </div>
        <div className='flex items-baseline pb-12'>
          <input type="text" className={`w-full rounded-lg text-black p-2 ${error ? 'text-red-500' : ''}`} placeholder={error ? 'Type your todo first!' : ''} value={toDo} onChange={handleChangeToDo} onKeyDown={handleKeyDown} />
          <button className='ps-4 self-center' onClick={saveToDo}>{addIcon}</button>
        </div>
      </div>
    </Fragment>
  )
}
