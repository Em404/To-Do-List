import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export const Navbar = ({ darkMode, handleDarkMode, setcliCkedLink }) => {
  const navItems = [
    {
      id: 0,
      name: "To Do",
      path: "todo",
    },
    {
      id: 1,
      name: "Done",
      path: "done",
    },
    {
      id: 2,
      name: "Deleted",
      path: "deleted",
    },
  ];

  {
    /* Desktop Navbar */
  }
  const desktopNavbar = () => {
    return (
      <div className="fixed top-0 bg-black h-full w-80 rounded-l-xl flex flex-col justify-between">
        <div className="px-8 pt-12">
          <div>
            <ul>
              {navItems.map((item, index) => {
                return (
                  <li key={index} className="text-white py-2">
                    <Link to={item.path} onClick={() => setcliCkedLink(true)}>
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="px-8 pb-12">
          <button className="text-white">Theme</button>
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
