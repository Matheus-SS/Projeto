import React from 'react';
import { size } from '../../constants';
import { HiHome, HiSearch, HiSave, HiTrash } from 'react-icons/hi';
export type NavItemsType = {
  id: number;
  text: string;
  path: string;
  icon: JSX.Element;
};

export const NAVBAR_DATA = [
  {
    id: 1,
    text: 'Home',
    path: '/',
    icon: <HiHome size={size.icon.medium} />,
  },
  {
    id: 2,
    text: 'Search',
    path: '/profile',
    icon: <HiSearch size={size.icon.medium} />,
  },
  {
    id: 3,
    text: 'Save',
    path: '/login',
    icon: <HiSave size={size.icon.medium} />,
  },
  {
    id: 4,
    text: 'Trash',
    path: '/trash',
    icon: <HiTrash size={size.icon.medium} />,
  },
];
