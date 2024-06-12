import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export const Navbar = ({ darkMode, handleDarkMode }) => {

  const listIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" height={14} width={14} viewBox="0 0 512 512">
    <path fill="#ffffff" d="M64 144a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM64 464a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm48-208a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z"/>
    </svg>
  )

  const checkIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" height={14} width={14} viewBox="0 0 448 512">
    <path fill="#ffffff" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
    </svg>
  )

  const trashIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" height={14} width={14} viewBox="0 0 448 512">
    <path fill="#ffffff" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
    </svg>
  )

  const iconTheme = (
    <svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 512 512">
    <path fill="#ffffff" d="M448 256c0-106-86-192-192-192V448c106 0 192-86 192-192zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/>
    </svg>
  )

  const navItems = [
    {
      id: 0,
      name: "To Do",
      path: "/todo",
      icon: listIcon
    },
    {
      id: 1,
      name: "Done",
      path: "/done",
      icon: checkIcon
    },
    {
      id: 2,
      name: "Deleted",
      path: "/deleted",
      icon: trashIcon
    },
  ];

  {
    /* Desktop Navbar */
  }
  const desktopNavbar = () => {
    return (
      <div className="flex flex-col justify-between h-[92vh]">
        <div className="px-8 pt-12">
          <h1 className="font-semibold py-2 mb-4">To Do List</h1>
          <ul>
            {navItems.map((item, index) => {
              return (
                <li key={index} className="py-2">
                  <Link to={item.path} className="flex items-baseline hover:scale-110 duration-300">
                    <div>{item.icon}</div>
                    <div className="px-2">{item.name}</div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="px-8 pb-12">
          <button className="flex items-baseline">
            <div>{iconTheme}</div>
            <div className="px-2">Theme</div>
          </button>
        </div> 
      </div>
    );
  };

  {
    /* Mobile Navbar */
  }
  const mobileNavbar = () => {
    return <div></div>;
  };

  return (
    <Fragment>
      {/* Desktop Navbar */}
      <div className="hidden lg:block">{desktopNavbar()}</div>

      {/* Mobile Navbar */}
      <div className="block lg:hidden">{mobileNavbar()}</div>
    </Fragment>
  );
};