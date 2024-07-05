import React, { Fragment, useState } from "react";
import { useAtom } from "jotai";
import { toDosAtom, deletedToDosAtom, doneToDosAtom } from "../atom";

export const ToDos = () => {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useAtom(toDosAtom);
  const [deletedToDos, setDeletedToDos] = useAtom(deletedToDosAtom);
  const [doneToDos, setDoneToDos] = useAtom(doneToDosAtom);
  const [error, setError] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [showActions, setShowActions] = useState(false);
  const [visibleActions, setVisibleActions] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedToDo, setSelectedToDo] = useState([]);

  const handleChangeToDo = (event) => {
    setToDo(event.target.value);
    if (event.target.value.trim() !== "") {
      setError(false);
    }
  };

  // save new todo
  const saveToDo = () => {
    if (toDo.trim() === "") {
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

    setToDo("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      saveToDo();
    }
  };

  // delete a todo
  const handleDelete = (index) => {
    const newToDos = [...toDos];
    const deletedToDo = newToDos.splice(index, 1);
    setToDos(newToDos);
    setDeletedToDos([...deletedToDos, ...deletedToDo]);
  };

  // mark a todo as done
  const handleDone = (index) => {
    const newToDos = [...toDos];
    const doneTodo = newToDos.splice(index, 1);
    setToDos(newToDos);
    setDoneToDos([...doneToDos, ...doneTodo]);
  };

  // edit a todo
  const handleEdit = (index) => {
    setToDo(toDos[index]);
    setEditIndex(index);
  };

  // select a todo
  const handleSelectToDo = (index) => {
    if (selectedToDo.includes(index)) {
      setSelectedToDo(selectedToDo.filter((i) => i !== index));
    } else {
      setSelectedToDo([...selectedToDo, index]);
    }
  };

  // select all todo
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedToDo([]);
    } else {
      setSelectedToDo(toDos.map((_, index) => index));
    }
    setSelectAll(!selectAll);
  };

  // mark as done a selected todo or more
  const handleDoneSelectedToDo = () => {
    const newToDos = toDos.filter((_, index) => !selectedToDo.includes(index));
    const doneToDo = toDos.filter((_, index) => selectedToDo.includes(index));
    setToDos(newToDos);
    setDoneToDos([...doneToDos, ...doneToDo]);
    setSelectedToDo([]);
  };

  // delete a selected todo or more
  const handleDeleteSelectedToDo = () => {
    const newToDos = toDos.filter((_, index) => !selectedToDo.includes(index));
    const deletedToDo = toDos.filter((_, index) =>
      selectedToDo.includes(index)
    );
    setToDos(newToDos);
    setDeletedToDos([...deletedToDos, ...deletedToDo]);
    setSelectedToDo([]);
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

  const checkIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={16}
      width={16}
      viewBox="0 0 448 512"
      className="text-white"
    >
      <path
        fill="currentColor"
        d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
      />
    </svg>
  );

  const trashIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={16}
      width={16}
      viewBox="0 0 448 512"
      className="text-white"
    >
      <path
        fill="currentColor"
        d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
      />
    </svg>
  );

  const editIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={16}
      width={16}
      viewBox="0 0 512 512"
      className="text-white"
    >
      <path
        fill="currentColor"
        d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
      />
    </svg>
  );

  const addIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={36}
      width={36}
      viewBox="0 0 512 512"
      className="text-white"
    >
      <path
        fill="currentColor"
        d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
      />
    </svg>
  );

  const menuIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={16}
      width={16}
      viewBox="0 0 128 512"
      className="text-white"
    >
      <path
        fill="currentColor"
        d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"
      />
    </svg>
  );

  return (
    <Fragment>
      <div className="flex flex-col justify-between h-full">
        {toDos.length === 0 ? (
          <p className="text-center dark:text-white text-purple-800 font-semibold text-xl mt-4">Your list is empty</p>
        ) : (
          <Fragment>
            {/* select */}
            <div className="flex justify-between items-center lg:items-end dark:bg-white/10 bg-black/40 lg:bg-transparent dark:lg:bg-transparent rounded-b-xl px-2 py-4 lg:pt-12 lg:pb-3">
              <div>
                <button
                  className="rounded-xl px-4 py-2 dark:bg-white/20 bg-black/20 text-white"
                  onClick={handleSelectAll}
                >
                  {selectAll ? "Deselect All" : "Select All"}
                </button>
              </div>
              <div
                className={`${selectedToDo.length > 0 ? "block" : "hidden"}`}
              >
                <button
                  className="dark:bg-white/10 bg-black/40 rounded-xl p-2"
                  onClick={() => handleDoneSelectedToDo()}
                >
                  {checkIcon}
                </button>
                <button
                  className="dark:bg-white/10 bg-black/40 rounded-xl p-2 ms-2"
                  onClick={() => handleDeleteSelectedToDo()}
                >
                  {trashIcon}
                </button>
              </div>
            </div>
            <div className="overflow-auto text-center lg:text-left font-semibold text-xl my-2 px-2">
              {/* to do */}
              {toDos.map((todo, index) => {
                return (
                  <div
                    key={index}
                    className="relative flex items-start py-2 dark:bg-white/10 bg-black/40 rounded-xl mb-4 ps-2"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <label>
                      <input
                        type="checkbox"
                        className="me-2 hover:cursor-pointer border-blue-900"
                        checked={selectedToDo.includes(index)}
                        onChange={() => handleSelectToDo(index)}
                      />
                      <span class="custom-checkbox"></span>
                    </label>
                    <div className="flex px-2 rounded text-base text-start font-normal w-full hover:cursor-pointer overflow-hidden">
                      <div className="break-words w-full">
                        <span className="break-all">{todo}</span>
                      </div>
                      <div
                        className={`flex justify-end absolute right-0 top-0 z-10 items-center h-full px-2 ${
                          showActions === index ? "block" : "hidden"
                        }`}
                      >
                        <button
                          className="hover:scale-125 duration-300"
                          onClick={() => handleDone(index)}
                        >
                          {checkIcon}
                        </button>
                        <button
                          className="hover:scale-125 duration-300 mx-4"
                          onClick={() => handleEdit(index)}
                        >
                          {editIcon}
                        </button>
                        <button
                          className="hover:scale-125 duration-300"
                          onClick={() =>
                            handleDelete(index, [...toDos], setToDos)
                          }
                        >
                          {trashIcon}
                        </button>
                      </div>
                      {visibleActions === index && (
                        <div className="flex justify-end absolute right-11 top-0 z-10 items-center h-full  animate-slide-in">
                          <button
                            className="ms-2"
                            onClick={() => handleEdit(index)}
                          >
                            {editIcon}
                          </button>
                          <button
                            className="mx-4"
                            onClick={() =>
                              handleDelete(index, [...toDos], setToDos)
                            }
                          >
                            {trashIcon}
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="flex self-center lg:hidden">
                      <button
                        className="me-2"
                        onClick={() => handleDone(index)}
                      >
                        {checkIcon}
                      </button>
                      <button
                        className="me-2"
                        onClick={() => handleShowActions(index)}
                      >
                        {menuIcon}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </Fragment>
        )}
        <div className="px-2 pb-2 lg:pb-8">
          {/* input */}
          <div className="flex items-baseline bg-black/20 dark:bg-white/10 p-2 rounded-xl w-full">
            <input
              type="text"
              className={`w-full rounded-lg text-black p-2 ${
                error ? "text-red-500" : ""
              }`}
              placeholder={error ? "Type your todo first!" : ""}
              value={toDo}
              onChange={handleChangeToDo}
              onKeyDown={handleKeyDown}
            />
            <button className="ps-4 self-center" onClick={saveToDo}>
              {addIcon}
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
