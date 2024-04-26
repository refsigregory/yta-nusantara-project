/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import { baseUrl } from '../config/app';
import stringToSlug from '../utils/slug';

const Navbar = () => {
  // State to manage dropdown visibility
  const [dropdownOneOpen, setDropdownOneOpen] = useState(false);
  const [dropdownTwoOpen, setDropdownTwoOpen] = useState(false);
  const [programs, setPrograms] = useState([]);

  const toggleDropdownOne = () => {
    setDropdownOneOpen(!dropdownOneOpen);
    setDropdownTwoOpen(false); // Close nested dropdown when main dropdown opens
  };

  // eslint-disable-next-line no-unused-vars
  const toggleDropdownTwo = () => {
    setDropdownTwoOpen(!dropdownTwoOpen);
  };

  // Ref for the navbar
  const navbarRef = useRef(null);

  useEffect(() => {
    // Function to close dropdowns when clicking outside
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setDropdownOneOpen(false);
        setDropdownTwoOpen(false);
      }
    };

    // Add event listener to detect clicks outside the navbar
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Fetch programs data from API
    fetch(`${baseUrl}/public/program_navbar`)
      .then(response => response.json())
      .then(data => setPrograms(data))
      .catch(error => console.error('Error fetching programs:', error));
  }, []);

  const navItems = [
    {
      label: 'Program',
      onClick: toggleDropdownOne,
      dropdownOpen: dropdownOneOpen,
      dropdownContent: programs,
    },
  ];


  return (
    <nav className="container my-4" ref={navbarRef}>
      <div className="flex flex-col w-full lg:flex-row lg:items-center lg:gap-16">
        {/* Logo & Toggler Button here */}
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <a href="/">
            <img
              src="/assets/svg/logo-bg-1.svg"
              className="h-full max-h-12 md:max-h-[80px]"
              alt=""
            />
          </a>
          {/* RESPONSIVE NAVBAR BUTTON TOGGLER */}
          <div className="block lg:hidden">
            <button
              className="p-1 outline-none mobileMenuButton"
              id="navbarToggler"
              data-target="#navigation"
            >
              <svg
                className="text-dark w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8h16M4 16h16"
                />
              </svg>
            </button>
          </div>
        </div>
        {/* Nav Menu */}
        <div className="hidden lg:block w-full" id="navigation">
          <div className="flex flex-col items-baseline gap-4 mt-6 lg:justify-between lg:flex-row lg:items-center lg:mt-0">
            <div className="flex flex-col w-full gap-4 lg:gap-[50px] lg:items-center lg:flex-row">
              {navItems.map((item, index) => (
                <NavItem key={index} {...item} />
              ))}
            </div>
          </div>
        </div>
        <div className="lg:ml-auto">
          <a href="tel:+6285398520322" className="btn-primary">
            Hubungi Kami
          </a>
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ label, onClick, dropdownOpen, dropdownContent }) => (
  <div>
    <button
      href="#"
      className="nav-link-item"
      onClick={onClick}
    >
      {label}
      <img src="/assets/svg/ic-chevron.svg" alt="" />
    </button>
    {/* Dropdown menu */}
    {dropdownOpen && (
      <div className="absolute z-10 top-10 bg-white divide-y divide-gray-100 rounded-lg box-shadow">
        <ul className="py-2 text-sm text-dark-1 font-medium md:whitespace-nowrap">
          {dropdownContent.map((program) => (
            <li key={program.id}>
              <NestedNavItem {...program} />
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

// eslint-disable-next-line no-unused-vars
const NestedNavItem = ({ id, name, sub_programs }) => {
  const [nestedDropdownOpen, setNestedDropdownOpen] = useState(false);

  const toggleNestedDropdown = () => {
    setNestedDropdownOpen(!nestedDropdownOpen);
  };

  return (
    <div>
      <div
        className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100"
      >
        <a href={`#program-${stringToSlug(name)}`}>{name}</a>
        {
            nestedDropdownOpen ?
              <img
                src="/assets/svg/ic-chevron.svg"
                onClick={toggleNestedDropdown}
                className="-rotate-120"
                alt="" />
                :
                sub_programs.length > 0 &&
                  <img
                    src="/assets/svg/ic-chevron.svg"
                    onClick={toggleNestedDropdown}
                    className="-rotate-90"
                    alt="" />
          }
      </div>
      {nestedDropdownOpen && sub_programs.length > 0 && (
        <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg box-shadow w-[320px] md:w-auto">
          <ul className="py-2 text-sm text-dark-1 font-medium md:whitespace-nowrap grid grid-rows-3 grid-flow-col gap-2">
            {sub_programs.map((subProgram, index) => (
              <li key={index}>
                <a href={`#subprogram-${stringToSlug(subProgram)}`} className="block px-4 py-2 hover:bg-gray-100">
                  {subProgram}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
