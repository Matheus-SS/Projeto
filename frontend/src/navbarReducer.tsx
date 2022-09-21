import React from 'react';
import {
  HiHome,
  HiSearch,
  HiSave,
  HiTrash,
  HiOutlineShare,
  HiOutlineCog,
} from 'react-icons/hi';
import { color, size } from './constants';

export type NavItemsType = {
  id: number;
  text: string;
  path: string;
  active: boolean;
  icon: (value: boolean) => JSX.Element;
};

export enum NavBarActionType {
  HANDLE_CLICK_NAVBAR_ITEM = 'HANDLE_CLICK_NAVBAR_ITEM',
}

type Action = {
  type: NavBarActionType;
  payload: number;
};

export const INITIAL_STATE = [
  {
    id: 1,
    text: 'Home',
    path: '#',
    active: true,
    icon: (active: boolean) => (
      <HiHome
        size={size.icon.medium}
        color={active ? color.fonts.active : color.fonts.secondary}
      />
    ),
  },
  {
    id: 2,
    text: 'Search',
    path: '#search',
    active: false,
    icon: (active: boolean) => (
      <HiSearch
        size={size.icon.medium}
        color={active ? color.fonts.active : color.fonts.secondary}
      />
    ),
  },
  {
    id: 3,
    text: 'Save',
    path: '#save',
    active: false,
    icon: (active: boolean) => (
      <HiSave
        size={size.icon.medium}
        color={active ? color.fonts.active : color.fonts.secondary}
      />
    ),
  },
  {
    id: 4,
    text: 'Trash',
    path: '#trash',
    active: false,
    icon: (active: boolean) => (
      <HiTrash
        size={size.icon.medium}
        color={active ? color.fonts.active : color.fonts.secondary}
      />
    ),
  },
  {
    id: 5,
    text: 'Share',
    path: '#share',
    active: false,
    icon: (active: boolean) => (
      <HiOutlineShare
        size={size.icon.medium}
        color={active ? color.fonts.active : color.fonts.secondary}
      />
    ),
  },
  {
    id: 6,
    text: 'Settings',
    path: '#setting',
    active: false,
    icon: (active: boolean) => (
      <HiOutlineCog
        size={size.icon.medium}
        color={active ? color.fonts.active : color.fonts.secondary}
      />
    ),
  },
];

export const navBarReducer = (state: NavItemsType[], action: Action) => {
  switch (action.type) {
    case 'HANDLE_CLICK_NAVBAR_ITEM':
      return state.map((navI) => {
        if (navI.id === action.payload) {
          return { ...navI, active: true };
        }
        return { ...navI, active: false };
      });
    default:
      return state;
  }
};
