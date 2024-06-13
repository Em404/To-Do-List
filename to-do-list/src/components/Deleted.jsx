import React, { Fragment } from "react";
import { useAtom } from "jotai";
import { deletedToDosAtom, toDosAtom } from "../atom";

export const Deleted = () => {
  const [deletedToDos, setDeletedToDos] = useAtom(deletedToDosAtom);
  const [toDos, setToDos] = useAtom(toDosAtom);

  const deletePermanent = (index) => {
    const newDeletedTodos = [...deletedToDos]
    const deletedPermanent = newDeletedTodos.splice(index, 1)
    setDeletedToDos(newDeletedTodos)
  };

  const deleteAll = () => {
    setDeletedToDos([]);
  }

  const restoreToDo = (index) => {
    const newDeletedToDos = [...deletedToDos];
    const restoredToDo = newDeletedToDos.splice(index, 1)[0]; // Rimuove l'elemento specifico e lo restituisce
    setDeletedToDos(newDeletedToDos); // Aggiorna l'elenco dei task cancellati
  
    const newToDos = [...toDos, restoredToDo]; // Aggiungi l'elemento specifico all'elenco dei task
    setToDos(newToDos); // Aggiorna l'elenco dei task attivi
  };

  const trashIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={14}
      width={14}
      viewBox="0 0 448 512"
    >
      <path
        fill="#ef4444"
        d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
      />
    </svg>
  );

  const restoreIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 512 512">
    <path fill="#ffffff" d="M125.7 160H176c17.7 0 32 14.3 32 32s-14.3 32-32 32H48c-17.7 0-32-14.3-32-32V64c0-17.7 14.3-32 32-32s32 14.3 32 32v51.2L97.6 97.6c87.5-87.5 229.3-87.5 316.8 0s87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3s-163.8-62.5-226.3 0L125.7 160z"/>
    </svg>
  )

  return (
    <Fragment>
      <div className="flex flex-col justify-between h-[90vh] lg:h-screen">
        <div className='mt-12 mb-12 overflow-auto text-center lg:text-left font-semibold text-xl'>
          <button className={`bg-red-500 text-white rounded-xl p-2 ${deletedToDos.length === 0 ? 'hidden' : 'block'}`} onClick={deleteAll}>Delete All</button>
          {deletedToDos.length === 0
            ? "No deleted tasks"
            : deletedToDos.map((todo, index) => {
                return (
                  <div
                    key={index}
                    className="flex justify-between glass px-4 py-4 my-4 rounded-lg text-base font-normal"
                  >
                    <p>{todo}</p>
                    <div className="flex">
                      <button className="hover:scale-125 duration-300" onClick={() => restoreToDo(index)}>
                        {restoreIcon}
                      </button>
                      <button
                        className="hover:scale-125 duration-300 mx-4"
                        onClick={() => deletePermanent(index)}
                      >
                        {trashIcon}
                      </button>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </Fragment>
  );
};
