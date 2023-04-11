import React, { useState } from 'react';
import {
  IconList,
  IconListContainer,
  IconListItem,
  ProfileContainer,
} from './styles';
import { Container } from '../../shared-styles';

import { NavLink } from 'react-router-dom';
import { color } from '../../constants';
import { NavItemsType } from './data';
import { useAuth } from '../../hook/useAuth';
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../../services/user';
import { size } from '../../constants';
import { HiHome, HiSearch, HiSave, HiTrash } from 'react-icons/hi';
export const Sidebar: React.FC = () => {
  const NAVBAR_DATA = [
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
      path: '/profile2',
      icon: <HiTrash size={size.icon.medium} />,
    },
  ];
  const { authed } = useAuth();
  console.log(authed);
  const { user, loading } = useAuth();
  console.log(user);
  return (
    <Container>
      <IconListContainer>
        <IconList>
          {NAVBAR_DATA.map((navI: NavItemsType) => (
            <IconListItem key={navI.id}>
              <NavLink
                to={navI.path}
                style={({ isActive }) =>
                  isActive
                    ? { color: color.fonts.active }
                    : { color: color.fonts.secondary }
                }
              >
                {navI.icon}
                <p>{navI.text}</p>
              </NavLink>
            </IconListItem>
          ))}
        </IconList>
      </IconListContainer>
      {loading ? (
        <small>carregando...</small>
      ) : (
        <ProfileContainer>
          <img src="https://i.pravatar.cc/150?img=27" />
        </ProfileContainer>
      )}
    </Container>
  );
};
