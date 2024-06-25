import React, { ReactNode, useState, useEffect } from 'react';
import { mdiClose, mdiDotsVertical } from '@mdi/js';
import BaseIcon from './BaseIcon';
import NavBarItemPlain from './NavBarItemPlain';
import NavBarMenuList from './NavBarMenuList';
import { MenuNavBarItem } from '../interfaces';

type Props = {
  menu: MenuNavBarItem[];
  className?: string;
  children: ReactNode;
};

export default function NavBar({ menu, className = '', children }: Props) {
  const [isMenuNavBarActive, setIsMenuNavBarActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 0;
      setIsScrolled(scrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMenuNavBarToggleClick = () => {
    setIsMenuNavBarActive(!isMenuNavBarActive);
  };

  return (
    <nav
      className={`${className} top-0 inset-x-0 fixed bg-white shadow-lg h-16 z-30 transition-all duration-300 w-screen lg:w-auto dark:bg-gray-900 ${
        isScrolled ? 'border-b border-gray-300 dark:border-gray-700' : ''
      }`}
    >
      <div className={`flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full`}>
        <div className='flex items-center h-full'>{children}</div>
        <div className='flex lg:hidden'>
          <NavBarItemPlain onClick={handleMenuNavBarToggleClick}>
            <BaseIcon
              path={isMenuNavBarActive ? mdiClose : mdiDotsVertical}
              size='24'
              className='text-gray-500 dark:text-gray-300'
            />
          </NavBarItemPlain>
        </div>
        <div
          className={`${
            isMenuNavBarActive ? 'block' : 'hidden'
          } lg:flex lg:items-center lg:static absolute top-16 left-0 w-full lg:w-auto bg-white dark:bg-gray-900 shadow-md lg:shadow-none`}
        >
          <NavBarMenuList menu={menu} className="flex flex-col lg:flex-row lg:items-center" />
        </div>
      </div>
    </nav>
  );
}
