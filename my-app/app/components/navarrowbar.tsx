"use client";

import { useState, useRef, useEffect } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import Link from 'next/link';
import { APP_LINKS } from "../utils/constant";


interface NavArrowBarProps {
    bgColor?: string; // Optional Tailwind CSS background color class
  }

const NavArrowBar: React.FC<NavArrowBarProps> = ({ bgColor = 'bg-white' }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Icon Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center text-[#877b73] text-2xl focus:outline-none"
        aria-expanded={isOpen}
        aria-controls="dropdown-menu"
      >
        <MdKeyboardArrowDown />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          id="dropdown-menu"
          className={`absolute top-full -right-4 w-screen ${bgColor} shadow-lg mt-0 rounded-lg overflow-hidden z-50`}
        >
          <div className="w-auto flex flex-wrap gap-2 p-4">
            {APP_LINKS.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className={` text-center flex px-4 py-2 ${bgColor} border border-spacing-2 text-black rounded hover:bg-[#75635f] transition`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavArrowBar;
