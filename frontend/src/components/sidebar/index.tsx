import React from 'react';
import { IconList, IconListContainer, IconListItem } from './styles';
import { Container } from '../../shared-styles';

import { NavLink } from 'react-router-dom';
import { color, path } from '../../constants';
import { useAuth } from '../../hook/useAuth';
import { size } from '../../constants';
import {
  HiHome,
  HiOutlineIdentification,
  HiOutlineLogin,
  HiOutlineUserAdd,
  HiOutlineLogout,
} from 'react-icons/hi';
type NavItemsType = {
  id: number;
  text: string;
  path: string;
  icon: JSX.Element;
};
export const Sidebar: React.FC = () => {
  const NAVBAR_DATA_PUBLIC = [
    {
      id: 1,
      text: 'Home',
      path: path.HOME,
      icon: <HiHome size={size.icon.medium} />,
    },
    {
      id: 3,
      text: 'Login',
      path: path.LOGIN,
      icon: <HiOutlineLogin size={size.icon.medium} />,
    },
    {
      id: 4,
      text: 'Cadastre-se',
      path: path.SIGNUP,
      icon: <HiOutlineUserAdd size={size.icon.medium} />,
    },
  ];

  const NAVBAR_DATA_PRIVATE = [
    {
      id: 1,
      text: 'Home',
      path: path.HOME,
      icon: <HiHome size={size.icon.medium} />,
    },
    {
      id: 2,
      text: 'Profile',
      path: path.PROFILE,
      icon: <HiOutlineIdentification size={size.icon.medium} />,
    },
  ];
  const { user, isLoadingSession } = useAuth();
  const NAVBAR = user.authenticated ? NAVBAR_DATA_PRIVATE : NAVBAR_DATA_PUBLIC;
  return (
    <Container>
      {isLoadingSession ? (
        'carregando'
      ) : (
        <IconListContainer>
          <IconList>
            {NAVBAR.map((navI: NavItemsType) => (
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
      )}

      {user.authenticated && (
        <IconListItem
          style={{
            marginBottom: '20px',
          }}
        >
          <NavLink
            to={'/'}
            style={{
              color: 'red',
              listStyle: 'none',
            }}
          >
            <HiOutlineLogout size={size.font.large} />
            <p>Sair</p>
          </NavLink>
        </IconListItem>
      )}
    </Container>
  );
};
