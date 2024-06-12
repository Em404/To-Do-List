import React, { Fragment, useState } from 'react'

export const ToDos = () => {

  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([])

  const handleChangeToDo = (event) => {
    setToDo(event.target.value);
  }

  const saveToDo = () => {
    const newTodos = [...toDos];
    newTodos.push(toDo);
    setToDos(newTodos);
    setToDo("");
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      saveToDo();
    }
  };

  const handleDelete = (index, newTodos, setFun) => {
    newTodos.splice(index, 1)
    setFun(newTodos)
  }

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
      <div className='flex flex-col justify-between h-[82vh] bg-gree'>
        <div>
          {toDos.length === 0 ? 'Your list is empty' : toDos.map((todo, index) => {
            return (
              <div key={index} className='flex justify-between bg-neutral-200/50 px-4 py-4 rounded-md'>
                <p>{todo}</p>
                <div className='flex'>
                  <button className='hover:scale-125 duration-300'>{checkIcon}</button>
                  <button className='hover:scale-125 duration-300 mx-4'>{editIcon}</button>
                  <button className='hover:scale-125 duration-300' onClick={() => handleDelete(index, [...toDos], setToDos)}>{trashIcon}</button>
                </div>
              </div>
            )
          })}
        </div>
        <div className='flex items-baseline'>
          <input type="text" className='w-full rounded-md text-black p-2' value={toDo} onChange={handleChangeToDo} onKeyDown={handleKeyDown} />
          <button className='ps-4 self-center' onClick={saveToDo}>{addIcon}</button>
        </div>
      </div>
    </Fragment>
  )
}
