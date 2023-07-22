import React from 'react';
import { IconList, IconListContainer, IconListItem } from './styles';
import { Container } from '../../shared-styles';

import { NavLink, useNavigate } from 'react-router-dom';
import { color, path } from '../../constants';
import { useAuth } from '../../hook/useAuth';
import { size } from '../../constants';
import {
  HiHome,
  HiOutlineIdentification,
  HiOutlineLogin,
  HiOutlineUserAdd,
  HiOutlineLogout,
  HiShoppingCart,
} from 'react-icons/hi';
import { useMutation, useQuery } from '@tanstack/react-query';
import { logout } from '../../services/user';
import { toastError } from '../../lib/toast';
import { getMyCart } from '../../services/cart';
import { useCart } from '../../hook/useCart';
import { AxiosError } from 'axios';
type NavItemsType = {
  id: number;
  text: string;
  path: string;
  icon: JSX.Element;
};

type CartType = {
  id: number;
  name: string;
  quantity: number;
  image: string;
  price: number;
};

type ErrorType = {
  message: string;
};

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
  // {
  //   id: 3,
  //   text: 'Cart',
  //   path: '/',
  //   icon: <HiShoppingCart size={size.icon.medium} />,
  // },
];

export const Sidebar: React.FC = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: () => {
      return logout();
    },
    onError: () => {
      setUser({
        email: '',
        username: '',
      });
      navigate('/');
      toastError('Erro ao encerrar sessão');
    },
    onSuccess: () => {
      setUser({
        email: '',
        username: '',
      });
      navigate('/');
    },
  });

  const logoutUser = () => {
    mutation.mutate();
  };

  const { setCart, setIsOpen, isOpen, getMyCartQuery } = useCart();

  function openCart() {
    setIsOpen(!isOpen);
    if (isOpen === false) {
      getMyCartQuery.refetch();
    }
  }
  const NAVBAR = user.email ? NAVBAR_DATA_PRIVATE : NAVBAR_DATA_PUBLIC;
  return (
    <Container>
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
          {user.email && (
            <IconListItem>
              <button className="button-cart" onClick={openCart}>
                <HiShoppingCart size={size.icon.medium} />
                <p>Cart</p>
              </button>
            </IconListItem>
          )}
        </IconList>
      </IconListContainer>

      {user.email && (
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
            <HiOutlineLogout size={size.icon.medium} onClick={logoutUser} />
            <p>Sair</p>
          </NavLink>
        </IconListItem>
      )}
    </Container>
  );
};
