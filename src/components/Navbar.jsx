import React, { useState } from "react";
import { Link } from "react-router-dom";
import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const NavItem = ({ nav, active, setActive }) => (
  <li
    key={nav.id}
    className={`${
      active === nav.title ? "text-purple" : "text-secondary"
    } hover:text-white text-[18px] font-medium cursor-pointer`}
    onClick={() => setActive(nav.title)}
  >
    <a href={`#${nav.id}`}>{nav.title}</a>
  </li>
);

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
          <p className="text-white text-[18px] font-bold cursor-pointer flex">
            Anna Kandyba &nbsp;<span className="sm:block hidden">| Portfolio</span>
          </p>
        </Link>

        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((nav) => (
            <NavItem key={nav.id} nav={nav} active={active} setActive={setActive} />
          ))}
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[100px] h-[28px] object-contain"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 gradient-1 absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              {navLinks.map((nav) => (
                <NavItem
                  key={nav.id}
                  nav={nav}
                  active={active}
                  setActive={(title) => {
                    setToggle(!toggle);
                    setActive(title);
                  }}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
