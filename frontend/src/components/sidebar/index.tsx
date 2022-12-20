import React from 'react';
import {
  Container,
  IconList,
  IconListContainer,
  IconListItem,
  ProfileContainer,
} from './styles';
import { NavLink } from 'react-router-dom';
import { color } from '../../constants';
import { NavItemsType, NAVBAR_DATA } from './data';

export const Sidebar: React.FC = () => {
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

      <ProfileContainer>
        <img src="https://i.pravatar.cc/150?img=27" />
      </ProfileContainer>
    </Container>
  );
};
