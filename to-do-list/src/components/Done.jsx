import React, { Fragment, useState } from 'react'
import { useAtom } from "jotai";
import { deletedToDosAtom, toDosAtom, doneToDosAtom } from "../atom";

export const Done = () => {
  const [doneToDos, setDoneToDos] = useAtom(doneToDosAtom)
  const [deletedToDos, setDeletedToDos] = useAtom(deletedToDosAtom);
  const [toDos, setToDos] = useAtom(toDosAtom);
  const [showActions, setShowActions] = useState(false)
  const [selectedToDo, setSelectedToDo] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [visibleActions, setVisibleActions] = useState(null);


  // delete a todo
  const handleDelete = (index) => {
    const newToDos = [...doneToDos];
    const deletedToDo = newToDos.splice(index, 1);
    setDoneToDos(newToDos);
    setDeletedToDos([...deletedToDos, ...deletedToDo]);
  };

  // restore a todo
  const handleRestore = (index) => {
    const newDoneToDos = [...doneToDos];
    const restoredToDo = newDoneToDos.splice(index, 1)[0]; // Rimuove l'elemento specifico e lo restituisce
    setDoneToDos(newDoneToDos); // Aggiorna l'elenco dei task completati
    setToDos([...toDos, restoredToDo]); // Aggiungi l'elemento specifico all'elenco dei task attivi
  };

  // select a todo
  const handleSelectToDo = (index) => {
    if (selectedToDo.includes(index)) {
      setSelectedToDo(selectedToDo.filter(i => i !== index));
    } else {
      setSelectedToDo([...selectedToDo, index]);
    }
  }

  // select al todo
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedToDo([]);
    } else {
      setSelectedToDo(doneToDos.map((_, index) => index));
    }
    setSelectAll(!selectAll);
  }

  // delete a selected todo or more
  const handleDeleteSelectedToDo = () => {
    const newToDos = doneToDos.filter((_, index) => !selectedToDo.includes(index));
    const deletedToDo = doneToDos.filter((_, index) => selectedToDo.includes(index));
    setDoneToDos(newToDos);
    setDeletedToDos([...deletedToDos, ...deletedToDo]);
    setSelectedToDo([]);
  }
  
  // restore a selected todo or more
  const handleRestoreSelectedToDo = () => {
    const newDoneToDos = doneToDos.filter((_, index) => !selectedToDo.includes(index));
    const restoredToDos = doneToDos.filter((_, index) => selectedToDo.includes(index));
    setDoneToDos(newDoneToDos);
    setToDos([...toDos, ...restoredToDos]);
    setSelectedToDo([]);
    setSelectAll(false);
  };
  
  // function to check if it is desktop or mobile
  function isDesktop() {
    return window.matchMedia("(pointer: fine)").matches;
  }

  const handleMouseEnter = (index) => {
    if (isDesktop()) {
      setShowActions(index);
    }
  };

  const handleMouseLeave = () => {
    if (isDesktop()) {
      setShowActions(null);
    }
  };

  const handleShowActions = (index) => {
    setVisibleActions(visibleActions === index ? null : index);
  };

  const trashIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={14}
      width={14}
      viewBox="0 0 448 512"
      className='text-blue-900'
    >
      <path
        fill="currentColor"
        d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
      />
    </svg>
  );

  const restoreIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 512 512" className='text-blue-900'>
    <path fill="currentColor" d="M125.7 160H176c17.7 0 32 14.3 32 32s-14.3 32-32 32H48c-17.7 0-32-14.3-32-32V64c0-17.7 14.3-32 32-32s32 14.3 32 32v51.2L97.6 97.6c87.5-87.5 229.3-87.5 316.8 0s87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3s-163.8-62.5-226.3 0L125.7 160z"/>
    </svg>
  )

  const menuIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 128 512" className='text-blue-900'>
    <path fill="currentColor" d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"/>
    </svg>
  )

  return (
    <Fragment>
      <div className="flex flex-col justify-between h-[80vh] lg:h-screen py-8 lg:py-12">
        <div className='overflow-auto text-center lg:text-left font-semibold text-xl'>
          {doneToDos.length === 0
            ? "No done tasks"
            : 
            <Fragment>
              {/* select */}
              <div className='flex justify-between font-normal text-base mb-2'>
                <button className='rounded-full px-4 py-2 bg-blue-900 text-white' onClick={handleSelectAll}>{selectAll ? 'Deselect All' : 'Select All'}</button>
                  <div className={`${selectedToDo.length > 0 ? 'block' : 'hidden'}`}>
                    <button className='dark:bg-white bg-transparent rounded-full p-2' onClick={() => handleRestoreSelectedToDo()}>{restoreIcon}</button>
                    <button className='dark:bg-white bg-transparent rounded-full p-2 ms-2'onClick={() => handleDeleteSelectedToDo()}>{trashIcon}</button>
                  </div>
              </div>
              {doneToDos.map((todo, index) => {
                return (
                  <div key={index} className="relative flex items-start py-4 border-b-2" onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}>
                    <label>
                      <input type="checkbox" className='me-2 hover:cursor-pointer border-blue-900' checked={selectedToDo.includes(index)} onChange={() => handleSelectToDo(index)}/>
                      <span class="custom-checkbox"></span>
                    </label> 
                    <div className='flex px-2 rounded text-base text-start font-normal w-full hover:cursor-pointer overflow-hidden'>
                      <div className='break-words w-full'>
                        <span className='break-all line-through'>{todo}</span>
                      </div>
                      <div className={`flex justify-end absolute right-0 top-0 z-10 items-center h-full dark:bg-neutral-900 bg-neutral-100 px-4 ${showActions === index ? 'block' : 'hidden'}`}>
                        <button className="hover:scale-125 duration-300 mx-4" onClick={() => handleRestore(index)}>{restoreIcon}</button>
                        <button className="hover:scale-125 duration-300 mx-4" onClick={() => handleDelete(index)}>{trashIcon}</button>
                      </div>
                      {visibleActions === index && (
                        <div className='flex justify-end absolute right-[1.35rem] top-0 z-10 items-center h-full dark:bg-neutral-900 bg-neutral-100 animate-slide-in'>
                          <button className='ms-2' onClick={() => handleRestore(index)}>{restoreIcon}</button>
                          <button className='mx-4' onClick={() => handleDelete(index)}>{trashIcon}</button>
                        </div>
                      )}
                    </div>
                    <div className='flex self-center lg:hidden'>
                      <button className='me-2' onClick={() => handleShowActions(index)}>{menuIcon}</button>
                    </div>
                  </div>
                );
              })}
            </Fragment>
      }
        </div>
      </div>
    </Fragment>
  )
}
