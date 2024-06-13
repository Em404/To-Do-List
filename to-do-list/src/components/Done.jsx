import React, { Fragment } from 'react'
import { useAtom } from "jotai";
import { deletedToDosAtom, toDosAtom, doneToDosAtom } from "../atom";

export const Done = () => {
  const [doneToDos, setDoneToDos] = useAtom(doneToDosAtom)
  const [deletedToDos, setDeletedToDos] = useAtom(deletedToDosAtom);
  const [toDos, setToDos] = useAtom(toDosAtom);

  const handleDelete = (index) => {
    const newToDos = [...doneToDos];
    const deletedToDo = newToDos.splice(index, 1);
    setDoneToDos(newToDos);
    setDeletedToDos([...deletedToDos, ...deletedToDo]);
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

  return (
    <Fragment>
      <div className="flex flex-col justify-between h-[90vh] lg:h-screen">
        <div className='mt-12 mb-12 overflow-auto text-center lg:text-left font-semibold text-xl'>
          {doneToDos.length === 0
            ? "No done tasks"
            : doneToDos.map((todo, index) => {
                return (
                  <div
                    key={index}
                    className="flex justify-between glass px-4 py-4 my-4 rounded-lg text-base font-normal"
                  >
                    <p>{todo}</p>
                    <div className="flex">
                      <button
                        className="hover:scale-125 duration-300 mx-4"
                        onClick={() => handleDelete(index)}
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
  )
}
